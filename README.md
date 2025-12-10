<img width="906" height="711" alt="image" src="https://github.com/user-attachments/assets/d626378a-0e86-4c44-9726-99f5887a6091" />

# ChatPDF

A simple end-to-end application that enables natural language querying of PDF documents using AI.

## Overview

ChatPDF uses RAG (Retrieval-Augmented Generation) architecture to extract information from PDF documents:

* **FastEmbed** for document embedding generation
* **FAISS** for vector similarity search
* **Groq LLaMA 3.1** for answer generation

The entire pipeline runs in a FastAPI server with a modern React frontend.

## Quick Start

### Build the Docker image

```bash
docker build -t chatpdf:local .
```

### Run the container

```bash
docker run -p 8000:8000 --env-file .env.docker chatpdf:local
```

### Access the application

* **Web Interface**: http://localhost:8000
* **API Health Check**: http://localhost:8000/api/health

## API Usage

### Upload a PDF

**Endpoint**: `POST /api/upload`

Example:

```bash
curl -X POST http://localhost:8000/api/upload \
  -F "filename=@document.pdf"
```

Response:

```json
{
  "status": "indexed",
  "filename": "document",
  "chunks": 42
}
```

### Query a PDF

**Endpoint**: `POST /api/query`

Example:

```bash
curl -X POST http://localhost:8000/api/query \
  -F "query=What are the main points?" \
  -F "filename=document"
```

Response:

```json
{
  "answer": "The main points discussed in the document include...",
  "results": [
    {
      "page": 1,
      "text": "Relevant text chunk from the document..."
    }
  ]
}
```

## How It Works

1. **Upload a PDF** through the web interface or API
2. **Text extraction** using PyMuPDF, split into 300-word chunks
3. **Embedding generation** using FastEmbed (BAAI/bge-small-en-v1.5)
4. **Vector storage** in FAISS index for fast similarity search
5. **Query processing** retrieves top-5 relevant chunks
6. **Answer generation** using Groq's LLaMA 3.1-8B with retrieved context
7. **Returns** AI-generated answer based only on document content

## Environment Variables

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Get your free Groq API key at [console.groq.com](https://console.groq.com)

## Local Development

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

### Frontend Setup

```bash
cd frontend/cute-chatpdf-ui
npm install
npm run dev
```

## Project Purpose

The goal was to build a complete RAG application demonstrating the full workflow from document processing to AI-powered question answering. This includes PDF text extraction and chunking, semantic embedding generation, vector similarity search, LLM integration with context injection, and building a REST API with a modern React interface. It works as a portfolio project to showcase full-stack ML engineering skills or as a foundation for document intelligence applications.

## Tech Stack

### Backend
* **Framework**: FastAPI
* **PDF Processing**: PyMuPDF
* **Embeddings**: FastEmbed (BAAI/bge-small-en-v1.5)
* **Vector Search**: FAISS
* **LLM**: Groq (LLaMA 3.1-8B-Instant)
* **Server**: Uvicorn

### Frontend
* **Framework**: React 19 + TypeScript
* **Build Tool**: Vite (Rolldown)
* **Styling**: Tailwind CSS
* **Animations**: Framer Motion
* **Icons**: Lucide React

### DevOps
* **Containerization**: Docker
* **CI/CD**: GitHub Actions
* **Deployment**: Render

## Project Structure

```
chatpdf/
├── backend/
│   ├── app.py           # FastAPI application
│   ├── ingest.py        # PDF processing & embeddings
│   ├── retriever.py     # Vector search logic
│   ├── llm.py           # Groq LLM integration
│   └── requirements.txt # Python dependencies
├── frontend/
│   └── cute-chatpdf-ui/
│       ├── src/
│       │   ├── components/
│       │   └── pages/
│       └── package.json
├── Dockerfile           # Multi-stage build
└── .github/
    └── workflows/
        └── deploy.yml   # Auto-deployment
```

## Deployment

### Using Docker

```bash
docker-compose up --build
```

### Using Render

1. Connect your GitHub repository to Render
2. Create a Web Service
3. Set environment variable: `GROQ_API_KEY`
4. Auto-deploys on push to `main`
