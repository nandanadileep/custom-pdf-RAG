import pickle
import faiss
from fastembed.embedding import FlagEmbedding

embedder = FlagEmbedding("BAAI/bge-small-en-v1.5")

def embed(texts):
    return [e.embedding for e in embedder.embed(texts)]


def search(query, filename, k=5):
    index = faiss.read_index(f"data/{filename}.faiss")

    chunks = pickle.load(open(f"data/{filename}_chunks.pkl", "rb"))

    q_emb = embed([query])

    distances, indices = index.search(q_emb, k)

    results = [chunks[i] for i in indices[0]]

    return results
