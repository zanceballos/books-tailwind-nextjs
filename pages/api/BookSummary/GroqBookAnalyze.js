import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });
  const { title, author, description, page_count } = req.body;

  try {
    const prompt = `Analyze the book ${title} by ${author}. Description: "${description.substring(
      0,
      1500
    )}
      return a JSON object with these four fields:

      1. "summary": A 100 word consise teaser summary.

      2. "vibe": An object containing: 
       - "emojis": An array of 3 emojis matching the book's vibes
       - "tags": AN array of 3 short mood adjectives (e.g. "Dark", "Romance Comedy")

      3. "why_read": An array of 3 short bullet points on why the user should read.

      4. "safety": A string indicating content guidance (e.g. "Containce Violence, PG13")

      5. "songs": Return a JSON array of 5 songs where each item has: 'song_img_url;,  'song_title', 'artist',  'reason' (one short sentence explaining the fit, famous songs if possible)

      6. "estimate_read": return a JSON object "difficulty" (e.g. Easy, Medium, Hard) of the "target_audience" (e.g. Adults, Kids, Any Ages) and estimated "time_to_finish" in hours (integer only, not Object) reading the book of ${page_count} pages 

      Do not include markdown formatting like \'\'\'json. Just return the raw JSON.
    
    "`;
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful literary assistant. You output only valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.1-8b-instant",
      response_format: { type: "json_object" }, // Forces JSON mode
    });

    const jsonResponse = JSON.parse(completion.choices[0].message.content);
    res.status(200).json(jsonResponse);
  } catch (error) {
    console.error("GROQ API Error:", error);
    res.status(500).json({ message: "Failed to analyze book" });
  }
}
