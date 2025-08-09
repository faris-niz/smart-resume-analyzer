# Resume-Job Match Backend

This is the backend service for the Resume-Job Match project.  
It:
- Accepts a resume (PDF) and a job description
- Extracts text from the resume
- Calculates similarity between resume and job description using **MiniLM embeddings**
- Generates improvement feedback using a local **Mistral LLM** via Ollama

---

## 🚀 Features
- **File upload** (PDF resumes)
- **Text extraction** with `pdfplumber`
- **Similarity scoring** using `all-MiniLM-L6-v2` from `sentence-transformers`
- **Feedback generation** with Gemini-Pro
- **FastAPI** for API endpoints

---

## 🛠️ Requirements
- Python 3.9+
- Pip
- [Ollama](https://ollama.com/download) installed and running locally

---

## 📦 Installation

1. **Clone the repo**
```bash
git clone https://github.com/your-username/resume-job-match-backend.git
cd resume-job-match-backend
