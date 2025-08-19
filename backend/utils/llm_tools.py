import openai
from dotenv import load_dotenv
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import os
from google import genai
from langchain_google_genai import ChatGoogleGenerativeAI

from pydantic import BaseModel
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser

load_dotenv()

class ResumeAnalysis(BaseModel):
    match_score: int
    feedback: str

model = SentenceTransformer('all-MiniLM-L6-v2')
parser = PydanticOutputParser(pydantic_object=ResumeAnalysis)

# Initialize the Gemini model
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",  # Or 'gemini-1.5-pro' depending on needs
    temperature=0.7  # Adjust as desired
)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert career advisor. Compare a resume text content with a job description and give structured feedback."),
    ("user", "Resume text content:\n{resume_text}\n\nJob Description:\n{job_description}\n\n"
             "Respond in JSON with fields 'match_score' (0–100) and 'feedback'.\n"
             "{format_instructions}")
])

def get_embedding(text: str) -> list:
    return model.encode(text, convert_to_numpy=True)

def compute_similarity(text1: str, text2: str) -> float:
    emb1 = np.array(get_embedding(text1)).reshape(1, -1)
    emb2 = np.array(get_embedding(text2)).reshape(1, -1)
    score = cosine_similarity(emb1, emb2)[0][0]
    return float(score)

async def generate_feedback(resume_text: str, job_description: str) -> str:
    formatted_prompt = prompt.format_messages(
        resume_text=resume_text,
        job_description=job_description,
        format_instructions=parser.get_format_instructions()
    )

    response = await llm.ainvoke(formatted_prompt)
    parsed = parser.parse(response.content)

    return {
        "match_score": parsed.match_score,
        "feedback": parsed.feedback
    }