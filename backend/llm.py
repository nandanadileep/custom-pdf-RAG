from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize client as None
client = None

def get_groq_client():
    global client
    if client is None:
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY is missing! Check your Render Environment Variables.")
        client = Groq(api_key=api_key)
    return client

def get_answer(query, retrieved_chunks):
    client = get_groq_client() # Connect only when needed
    
    context = "\n\n".join(retrieved_chunks)

    prompt = f"""
    You must answer using ONLY the context below.

    Context:
    {context}

    Question: {query}

    If the answer IS clearly present in the context, answer it.
    If the answer is NOT present, say: "Information not found in the document."
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.4
    )

    return response.choices[0].message.content