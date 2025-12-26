import mongoose from "mongoose";

const vectorSchema = new mongoose.Schema({
  fileName: String,
  chunkText: String,
  embedding: [Number],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Vector", vectorSchema);
