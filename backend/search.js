import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import VectorModel from "./models/Vector.js";

dotenv.config();
const router = express.Router();

router.post("/search", async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) return res.status(400).json({ error: "Query is required" });

        let queryEmbedding;

        // Use OpenAI API to generate embedding for the search query
        // Fallback to mock only if key is the placeholder
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "sk-your-key") {
            console.log("⚠️ Using mock query embedding (No valid OpenAI API key provided)");
            queryEmbedding = Array.from({ length: 1536 }, () => Math.random());
        } else {
            const embedRes = await axios.post(
                "https://api.openai.com/v1/embeddings",
                { input: query, model: "text-embedding-3-small" },
                { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
            );
            queryEmbedding = embedRes.data.data[0].embedding;
        }

        // Modern Atlas Vector Search Aggregation
        const results = await VectorModel.aggregate([
            {
                $vectorSearch: {
                    index: "vector_index",
                    path: "embedding",
                    queryVector: queryEmbedding,
                    numCandidates: 100,
                    limit: 5
                }
            },
            {
                $project: {
                    _id: 0,
                    text: "$chunkText",
                    score: { $meta: "vectorSearchScore" }
                }
            }
        ]);

        console.log(`✅ Search completed: Found ${results.length} results`);
        res.json({ results });

    } catch (err) {
        console.error("❌ Vector Search Error:", err.message);
        res.status(500).json({ error: "Search failed", details: err.message });
    }
});

export default router;
