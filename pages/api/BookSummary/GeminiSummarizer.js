import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Deconstruct the title and author
  const { title, author } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `Provide a concise and engaging summary of the book "${title}" by ${author}. 
    Focus on the main themes, key plot points (without major spoilers if fiction), and what makes it worth reading and why should they read it based on the type of genre the readers like etc. 
    Keep it under 100 words.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    res.status(200).json({ summary });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to generate summary' });
  }
}
