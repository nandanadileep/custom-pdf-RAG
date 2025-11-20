import fitz
import os
import pickle
import faiss
from fastembed.embedding import FlagEmbedding

embedder = FlagEmbedding("BAAI/bge-small-en-v1.5")

def embed(texts):
    return [e.embedding for e in embedder.embed(texts)]

def extract_text_from_pdf(content_bytes):
    pdf = fitz.open(stream=content_bytes, filetype="pdf")
    texts = []

    for i, page in enumerate(pdf):
        page_text = page.get_text()
        texts.append({"page": i + 1, "text": page_text})

    return texts


def chunk_text(page_texts, chunk_size=300):
    chunks = []

    for item in page_texts:
        page = item["page"]
        text = item["text"]

        words = text.split()
        for i in range(0, len(words), chunk_size):
            chunk = " ".join(words[i:i + chunk_size])
            if chunk.strip():
                chunks.append({
                    "page": page,
                    "text": chunk
                })

    return chunks


def process_pdf(content_bytes, filename):
    os.makedirs("data", exist_ok=True)

    # 1. Extract text
    pages = extract_text_from_pdf(content_bytes)

    # 2. Chunk text
    chunks = chunk_text(pages)

    # 3. Create list of only chunk text for embeddings
    chunk_texts = [c["text"] for c in chunks]

    # 4. Embed
    embeddings = embed(chunk_texts)

    # 5. Build FAISS index
    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)

    # 6. Save FAISS + chunks
    faiss.write_index(index, f"data/{filename}.faiss")
    pickle.dump(chunks, open(f"data/{filename}_chunks.pkl", "wb"))

    return {"chunks": len(chunks)}