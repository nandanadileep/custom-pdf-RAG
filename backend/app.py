from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
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

@app.get("/")
def root():
    return {"message": "Custom PDF RAG Server Running"}

@app.post("/upload")
async def upload_pdf(file: UploadFile):
    content = await file.read()
    filename = file.filename.replace(".pdf", "")

    info = process_pdf(content, filename)

    return {
        "status": "indexed",
        "filename": filename,
        "chunks": info["chunks"]
    }


@app.post("/query")
async def query_pdf(query: str = Form(...), filename: str = Form(...)):
    results = search(query, filename)

    answer = get_answer(query, [r["text"] for r in results])

    return {
        "answer": answer,
        "results": results
    }
