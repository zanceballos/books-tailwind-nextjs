import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    const { query } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a Google Books API query expert. 
          Your goal is to translate the user's "vibe" or "feeling" into a technical search string.
          
          Rules:
          1. Return ONLY a valid JSON object. No markdown, no conversation.
          2. The JSON must have a 'q' field (keywords) and optional 'subject' field.
          3. If the user mentions a genre (like sci-fi, horror), put it in 'subject'.

          Subject can only have 1 of these values: fiction, non-fiction, fantasy, romance, science, history, biography, mystery, thriller, selfhelp, health, travel, religion, sci-fi, comics, graphic-novel.

          Here are some examples to guide you:
          
          Example Input: "I want a sad story about space explorers."
          Example Output: { "q": "sad space exploration", "subject": "fiction" }`,
        },
        {
          role: "user",
          content: query,
        },
      ],
      model: "llama-3.1-8b-instant",
      response_format: { type: "json_object" }, // Forces JSON mode
    });

    const searchParams = JSON.parse(completion.choices[0].message.content);
    console.log("Groq suggested:", searchParams);

    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

    // Construct the Google Books API URL
    let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      searchParams.q
    )}`;

    if (searchParams.subject) {
      apiUrl += `+subject:${encodeURIComponent(searchParams.subject)}`;
    }

    const googleRes = await fetch(
      apiUrl + `&maxResults=20&orderBy=newest&key=${apiKey}`
    );
    console.log(
      "Fetching Google Books API with URL:",
      apiUrl + `&maxResults=20&orderBy=newest&key=${apiKey}`
    );

    const Bookdata = await googleRes.json();
    console.log("Books found:", Bookdata.items ? Bookdata.items.length : 0);

    if (Bookdata.items.length < 10) {
      //Fill the results with a broader search
      const broaderRes = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          searchParams.q
        )}&maxResults=20&orderBy=relevance&key=${apiKey}`
      );
      const broaderData = await broaderRes.json();
      console.log(
        "Broader search books found:",
        broaderData.items ? broaderData.items.length : 0
      );

      let combinedBooks = [...Bookdata.items, ...broaderData.items];

      const uniqueBooks = [];
      const seenIds = new Set();
      //remove ny unique books by id
      for (const book of combinedBooks) {
        if (!seenIds.has(book.id)) {
          uniqueBooks.push(book);
          seenIds.add(book.id);
        }
      }
      res
        .status(200)
        .json({ userQuery: searchParams.q, books: uniqueBooks || [] });

      console.log(
        "Total combined books:",
        (Bookdata.items.length || 0) + (broaderData.items.length || 0)
      );
    } else {
      res
        .status(200)
        .json({ userQuery: searchParams.q, books: Bookdata.items || [] });
    }
  } catch (error) {
    console.error("GROQ API Error:", error);
    res.status(500).json({ message: "Failed to fetch search results" });
  }
}
