import express from "express";
import multer from "multer";
import axios from "axios";
import dotenv from "dotenv";
import VectorModel from "./models/Vector.js";
import { extractTextFromPDF } from "./utils/pdfParser.js";
import { createChunks } from "./utils/chunker.js";

dotenv.config();
const router = express.Router();

// MULTER using memory storage
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const buffer = req.file.buffer;
    const fileName = req.file.originalname;

    // Step 1: Extract text
    const text = await extractTextFromPDF(buffer);

    // Step 2: Chunk text
    const chunks = createChunks(text);

    let stored = 0;

    // Step 3: Embedding every chunk
    for (const chunk of chunks) {
      let embedding;

      if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "sk-your-key") {
        console.log("⚠️ Using mock embeddings (no valid API key found)");
<<<<<<< HEAD
        // Use 768 dimensions to match MongoDB vector_index
        embedding = Array.from({ length: 768 }, () => Math.random());
=======
        // OpenAI embeddings are typically 1536 dimensions
        embedding = Array.from({ length: 1536 }, () => Math.random());
>>>>>>> cace90b7abc48e10eb2352e88a308b25b904c3d5
      } else {
        const embedRes = await axios.post(
          "https://api.openai.com/v1/embeddings",
          { input: chunk, model: "text-embedding-3-small" },
          { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
        );
        embedding = embedRes.data.data[0].embedding;
      }

      // Step 4: Store in MongoDB
      await VectorModel.create({
        fileName,
        chunkText: chunk,
        embedding
      });

      stored++;
    }

    res.json({
      message: "Upload successful!",
      chunksStored: stored
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ingestion failed", details: err.message });
  }
});

export default router;
