from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from utils.pdf_parser import extract_text_from_pdf
from pydantic import BaseModel
import random
from utils.llm_tools import compute_similarity
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

class AnalysisResponse(BaseModel):
    resume_text: str
    match_score: int
    feedback: str

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_resume(resume: UploadFile, job_description: str = Form(...)):
    resume_text = await extract_text_from_pdf(resume)

    # Compute similarity using OpenAI embeddings
    similarity = compute_similarity(resume_text, job_description)
    score = int(similarity * 100)  # Convert to 0–100 scale
    print('score', score)

    feedback =  generate_feedback(resume_text, job_description)
    return AnalysisResponse(
        resume_text=resume_text,
        match_score=score,
        feedback=feedback
    )