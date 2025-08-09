import { useState } from 'react';
import FileUpload from './components/FileUpload.tsx';
import TextAreaInput from './components/TextAreaInput.tsx';
import AnalysisResult from './components/AnalysisResult.tsx';

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobText, setJobText] = useState('');
  const [result, setResult] = useState({});

  const handleAnalyze = async () => {
    if (!resumeFile || !jobText.trim()) {
      alert('Please upload a resume and enter a job description.');
      return;
    }
    console.log('handleAnalyze');
    const formData = new FormData();
    formData.append('resume', resumeFile); // File object
    formData.append('job_description', jobText);

    const response = await fetch('http://localhost:8000/analyze', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    
    // Placeholder logic
    // setResult({
    //   score: 82,
    //   feedback: "Your resume matches well, but you’re missing keywords like 'cloud computing' and 'leadership experience'.",
    // });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Smart Resume Analyzer</h1>
        <FileUpload setText={setResumeFile} />
        <TextAreaInput label="Job Description" value={jobText} setValue={setJobText} />
        <button
          onClick={handleAnalyze}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Analyze
        </button>
        {result && <AnalysisResult result={result} />}
      </div>
    </div>
  );
}

export default App;
