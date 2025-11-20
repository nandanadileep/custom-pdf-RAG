import pickle
import faiss
import numpy as np
from fastembed.embedding import FlagEmbedding

embedder = FlagEmbedding("BAAI/bge-small-en-v1.5")

def embed(texts):
    return list(embedder.embed(texts))

def search(query, filename, k=5):
    index = faiss.read_index(f"data/{filename}.faiss")

    chunks = pickle.load(open(f"data/{filename}_chunks.pkl", "rb"))

    # Embed query → list of 1 numpy vector
    q_emb = embed([query])

    # ❗ FIX #1: convert query embedding → 2D array (1, dim)
    q_matrix = np.vstack(q_emb).astype("float32")

    # ❗ FIX #2: perform FAISS search with correct type
    distances, indices = index.search(q_matrix, k)

    results = [chunks[i] for i in indices[0]]

    return results
