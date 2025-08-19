from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from utils.pdf_parser import extract_text_from_pdf
import random
from utils.llm_tools import compute_similarity
from utils.llm_tools import ResumeAnalysis
from utils.llm_tools import generate_feedback


app = FastAPI()

# Allow frontend on localhost:5173 (Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze", response_model=ResumeAnalysis)
async def analyze_resume(resume: UploadFile, job_description: str = Form(...)):
    resume_text = await extract_text_from_pdf(resume)
    feedback =  await generate_feedback(resume_text, job_description)
    return feedback