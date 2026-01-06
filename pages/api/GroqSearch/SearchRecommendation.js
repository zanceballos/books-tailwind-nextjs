import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res){
    if (req.method !== "POST")
        return res.status(405).json({ message: "Method not allowed" });
    

    try {
        const prompt = `provide 5 trending 3 to 5 word descriptions for books to guide user of what prompt they can use, return as an array of strings. Ensure the keywords are relevant to books and are diverse in themes and genres. Make sure the keywords are engaging and likely to attract readers interested in this category and query. Return only the array called "trending_keywords" each item holds: "label", "Emoji" and "color" of keywords without any additional text or formatting. Color should be one of these options: red, orange, yellow, green, blue, pink, teal, cyan, lime. No Purple or any close color allowed`;
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
        res.status(500).json({ message: "Failed to fetch recommendations" });
    }
} 