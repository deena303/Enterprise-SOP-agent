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
            // Use 768 dimensions to match MongoDB index
            queryEmbedding = Array.from({ length: 768 }, () => Math.random());
        } else {
            const embedRes = await axios.post(
                "https://api.openai.com/v1/embeddings",
                { input: query, model: "text-embedding-3-small" },
                { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
            );
            queryEmbedding = embedRes.data.data[0].embedding;
        }

        // Modern Atlas Vector Search Aggregation - request only top result
        let results;
        try {
            results = await VectorModel.aggregate([
                {
                    $vectorSearch: {
                        index: "vector_index",
                        path: "embedding",
                        queryVector: queryEmbedding,
                        numCandidates: 100,
                        limit: 1
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
        } catch (vectorErr) {
            console.log("⚠️ Vector Search failed, using simple search...", vectorErr.message);
            // Fallback: simple text search if vector search index doesn't exist
            const chunk = await VectorModel.findOne(
                { chunkText: { $regex: query, $options: "i" } },
                { _id: 0, text: "$chunkText", score: { $literal: 0.5 } }
            );
            results = chunk ? [{ text: chunk.chunkText, score: 0.5 }] : [];
        }

        const top = results && results.length ? results[0] : null;
        console.log(`✅ Search completed: returning top result${top ? '' : ' (none found)'}`);
        res.json({ result: top });

    } catch (err) {
        console.error("❌ Vector Search Error:", err);
        console.error("Error details:", err.message);
        console.error("Error type:", err.name);
        res.status(500).json({ 
            error: "Search failed", 
            details: err.message,
            hint: "Make sure MongoDB is connected and vector_index exists. Try uploading a PDF first."
        });
    }
});

export default router;
