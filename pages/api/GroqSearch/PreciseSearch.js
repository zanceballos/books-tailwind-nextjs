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
          content: `You are a Search Intent Optimizer for the Google Books API.
          Analyze the user's request and translate it into the optimal API parameters.

          Your goal is to strip away conversational fluff ("show me", "books about", "released this month") 
          and return purely technical search terms.

          1. EXTRACT the core topic or genre (e.g., "sci fi" -> "science fiction").
      2. REMOVE "poison words" that ruin search results: "popular", "best", "trending", "good", "top", "now", "books", "about".
      3. DECIDE sorting strategy.

          JSON Output Rules:
          1. "q": The cleaned keywords. (e.g., if user says user: "books like harry potter" -> q: "magic wizard school"), if user says things that exists such as "Star Wars", "Harry Potter", then keep it as is.). So if user mentions "books like [specific book]" or something similar such as "recommend me", infer the core themes and return those as keywords. Else, just return the cleaned keywords.
          2. "subject": The genre is only ONE word, no more, no less: Art, Biography & Autobiography, Children's Fiction, Computers, Cooking, Drama, Economics, Education, Fiction, History, Mathematics, Philosophy, Poetry, Psychology, Religion, Science, Travel˝
          3. "orderBy": ONLY use "newest" if the user EXPLICITLY asks for "new", "latest", "recent", or "2024/2025/2026". Otherwise, use "relevance".
          4. "exactMode": Boolean. Set to true if user names a specific book title or author.



          Examples:
          Input: "scary books about clowns"
          Output: { "q": "clowns", "subject": "horror", "orderBy": "relevance" }

          Input: "latest romance novels"
          Output: { "q": "", "subject": "romance", "orderBy": "newest" } 
          (Note: We removed 'latest' from 'q' because 'newest' handles the sorting)

          Input: "books like hunger games"
          Output: { "q": "dystopian survival competition", "subject": "fiction", "orderBy": "relevance" }
          
          Input: "written by Stephen King"
          Output: { "q": "inauthor:Stephen King", "orderBy": "relevance", "exactMode": true }

          Input: "popular sci fi now"
          Output: { "q": "science fiction", "subject": "science fiction", "orderBy": "relevance" }
          (Reason: We stripped 'popular' and 'now'. We kept 'science fiction' as the keyword.)

          Input: "best history books"
          Output: { "q": "history", "subject": "history", "orderBy": "relevance" }

      Input: "new horror books released this week"
      Output: { "q": "horror", "subject": "horror", "orderBy": "newest" }
      `,
        },
        { role: "user", content: query },
      ],
      model: "llama-3.1-8b-instant",
      response_format: { type: "json_object" },
    });

    const params = JSON.parse(completion.choices[0].message.content);
    console.log("Groq suggested params:", params);
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

    //begin constructing Google Books API URL
    let apiUrl = `https://www.googleapis.com/books/v1/volumes?key=${apiKey}`;

    //construct query
    let qParts = [];
    if (params.q) {
      qParts.push(params.q);
    }
    if (params.subject) {
      qParts.push(`subject:${params.subject}`);
    }

    const finalQuery = qParts.join("+");
    apiUrl += `&q=${encodeURIComponent(finalQuery)}`;

    apiUrl += `&orderBy=${params.orderBy || "relevance"}`;
    apiUrl += `&maxResults=20`;

    // Fetch from Google Books API
    console.log("Final Google Books API URL:", apiUrl);
    const googleRes = await fetch(apiUrl);
    const data = await googleRes.json();
    const books = data.items || [];

    if (books.length === 0) {
      console.log(
        "Strict 'newest' sort returned 0. Retrying with 'relevance'..."
      );
      const fallbackUrl = apiUrl.replace(
        "&orderBy=newest",
        "&orderBy=relevance"
      );

      console.log("Fallback Google Books API URL:", fallbackUrl);
      const fallbackRes = await fetch(fallbackUrl);
      const fallbackData = await fallbackRes.json();

      // Last Resort
      // If relevance returns no results, return try again with subject search only with newest first
      // 1. If still 0, try subject search by subject
      if ((fallbackData.items || []).length === 0 || fallbackData?.items?.length < 20 && params.subject) {
        console.log(
          "Strict 'newest' sort returned 0. Retrying with 'subject only'..."
        );
        const subjectOnlyUrl = `https://www.googleapis.com/books/v1/volumes?key=${apiKey}&q=subject:${encodeURIComponent(
          params.subject
        )}&orderBy=newest&maxResults=20`;

        console.log("Subject Only Google Books API URL:", subjectOnlyUrl);
        const subjectOnlyRes = await fetch(subjectOnlyUrl);
        const subjectOnlyData = await subjectOnlyRes.json();

        res.status(200).json({
          interpretation: params.q,
          books: subjectOnlyData.items || [],
        });
        return;
      }
      res.status(200).json({
        interpretation: params.q,
        books: fallbackData.items || [],
      });
      return;
    }

    res.status(200).json({
      interpretation: params.q,
      books: books,
    });
  } catch (error) {
    console.error("GROQ API Error:", error);
    res.status(500).json({ message: "Failed to fetch search results" });
  }
}
