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

description_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert career advisor. Compare a resume text content with a job description and give structured feedback."),
    ("user", "Resume text content:\n{resume_text}\n\nJob Description:\n{job_description}\n\n"
             "Respond in JSON with fields 'match_score' (0–100) and 'feedback'.\n"
             "{format_instructions}")
])

link_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert career advisor. Compare a resume text content with a job url and give structured feedback."),
    ("user", "Resume text content:\n{resume_text}\n\nJob url:\n{job_url}\n\n"
             "Respond in JSON with fields 'match_score' (0–100) and 'feedback'.\n"
             "{format_instructions}")
])

async def generate_feedback_description(resume_text: str, job_description: str) -> str:
    formatted_prompt = description_prompt.format_messages(
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

async def generate_feedback_link(resume_text: str, job_url: str) -> str:
    formatted_prompt = link_prompt.format_messages(
        resume_text=resume_text,
        job_url=job_url,
        format_instructions=parser.get_format_instructions()
    )

    response = await llm.ainvoke(formatted_prompt)
    parsed = parser.parse(response.content)

    return {
        "match_score": parsed.match_score,
        "feedback": parsed.feedback
    }