import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Deconstruct the title and author
  const { title, author, description, page_count } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
      generationConfig: { responseMimeType: "application/json" },
    });

    const prompt = `Analyze the book ${title} by ${author}. Description: "${description.substring(0,1500)}
      return a JSON object with these four fields:

      1. "summary": A 100 word consise teaser summary.
      2. "vibe": An object containing: 
       - "emojies": An array of 3 emojis matching the book's vibes
       - "tags": AN array of 3 short mood adjectives (e.g. "Dark", "Romance-Comedy")
      3. "why_read": An array of 3 short, puncy bullet points on why the user should read.
      4. "safety": A string indicating content guidance (e.g. "Containce Violence, PG13")
      5. "songs": Return a JSON array where each item has: 'song_img_url;,  'song_title', 'artist', and 'reason' (one short sentence explaining the fit, famous songs if possible)."
      6. "estimate_read": return a JSON object "difficulty" (e.g. Easy, Medium, Hard) of the, "target_audience" (e.g. Adults, Kids, Any Ages) and estimated time in integer (e.g. 4) to finish reading the book of ${page_count} pages

      Do not include markdown formatting like \'\'\'json. Just return the raw JSON.
    
    "`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text()

    const data = JSON.parse(jsonText)

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to generate summary" });
  }
}
