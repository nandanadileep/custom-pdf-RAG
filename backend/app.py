from fastapi import FastAPI, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles  # <--- Added Import
import os                                    # <--- Added Import
from ingest import process_pdf
from retriever import search
from llm import get_answer

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"message": "Custom PDF RAG Server Running"}

@app.post("/api/upload")
async def upload_pdf(filename: UploadFile = File(...)):
    content = await filename.read()
    file_name_clean = filename.filename.replace(".pdf", "")

    info = process_pdf(content, file_name_clean)

    return {
        "status": "indexed",
        "filename": file_name_clean,
        "chunks": info["chunks"]
    }

@app.post("/api/query")
async def query_pdf(query: str = Form(...), filename: str = Form(...)):
    results = search(query, filename)
    answer = get_answer(query, [r["text"] for r in results])

    return {
        "answer": answer,
        "results": results
    }

if os.path.exists("static"):
    app.mount("/", StaticFiles(directory="static", html=True), name="static")