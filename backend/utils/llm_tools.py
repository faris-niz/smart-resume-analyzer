import openai
from dotenv import load_dotenv
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
# import google.generativeai as genai
import os
from google import genai

# genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
load_dotenv()
client = genai.Client()
# model2 = genai.GenerativeModel('gemini-pro')
# openai.api_key = os.getenv("OPENAI_API_KEY")
model = SentenceTransformer('all-MiniLM-L6-v2')

def get_embedding(text: str) -> list:
    return model.encode(text, convert_to_numpy=True)

def compute_similarity(text1: str, text2: str) -> float:
    emb1 = np.array(get_embedding(text1)).reshape(1, -1)
    emb2 = np.array(get_embedding(text2)).reshape(1, -1)
    score = cosine_similarity(emb1, emb2)[0][0]
    return float(score)

def generate_feedback(resume_text: str, job_text: str) -> str:
    prompt = f"""
You are a resume expert. Analyze the resume text content below against the job description and give:
- A match score (1 to 100)
- 3 suggestions to improve the resume
- Missing keywords

Resume text content:
{resume_text}

Job Description:
{job_text}
"""
    print('resume_text', resume_text)
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=prompt
    )
    print(response.text)
    # response = client.text_generation(prompt, max_new_tokens=300)
    return response.text