import pdfplumber
from fastapi import UploadFile
import io

async def extract_text_from_pdf(uploaded_pdf: UploadFile) -> str:
    print('def function')
    contents = await uploaded_pdf.read()
    print('1')
    with pdfplumber.open(io.BytesIO(contents)) as pdf:
        print('with as pdf')
        full_text = "\n".join(page.extract_text() or '' for page in pdf.pages)
    print('2')
    return full_text.strip()