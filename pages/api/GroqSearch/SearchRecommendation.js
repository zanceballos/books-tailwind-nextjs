import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res){
    if (req.method !== "POST")
        return res.status(405).json({ message: "Method not allowed" });
    

    try {
        const prompt = `Generate 8 trending book search queries (4-5 words each).
            
            Return a valid JSON object with a single key: "trending_keywords".
            "trending_keywords" must be an array of objects.
            
            Each object must strictly have these 3 fields:
            1. "label": The search query string.
            2. "emoji": A single relevant emoji character.
            3. "color": One of the following values: "whiteAlpha", "blackAlpha", "gray", "red", "orange", "yellow", "green", "teal", "blue", "cyan", "pink". (Do not use purple).`;
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