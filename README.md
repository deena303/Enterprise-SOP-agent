OpsMind AI – Enterprise SOP Agent
OpsMind AI is a context-aware AI system that helps employees quickly find accurate answers from corporate SOP documents using Retrieval Augmented Generation (RAG) with source citations.

Key Features:
Upload and manage SOP PDFs
RAG-based semantic search using vector embeddings
Accurate answers with exact SOP source citations
Real-time chat with streaming responses

Tech Stack:
Frontend: React
Backend: Node.js, Express
Database: MongoDB Atlas (Vector Search)
File Upload: Multer
LLM: Gemini 1.5 Flash

How It Works:
SOP PDFs are uploaded and split into text chunks
Vector embeddings are generated and stored
User queries retrieve relevant SOP chunks
LLM generates answers strictly from retrieved data

Use Case:
Designed for enterprises managing large SOP documents to ensure fast, reliable, and explainable knowledge access.
