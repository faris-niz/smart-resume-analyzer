import { useState } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload.tsx';
import TextAreaInput from './components/TextAreaInput.tsx';
import AnalysisResult from './components/AnalysisResult.tsx';
import ParticlesBg from 'particles-bg';

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobText, setJobText] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [selectedTab, setSelectedTab] = useState<'description' | 'url'>('url');
  const [result, setResult] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleAnalyze = async () => {
    const isDescription = selectedTab === 'description' && jobText.trim();
    const analyzePath = selectedTab === 'description' ? 'description' : 'link'
    const isUrl = selectedTab === 'url' && jobUrl.trim();

    if (!resumeFile || (!isDescription && !isUrl)) {
      alert('Please upload a resume and enter a job description or a job URL.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);

    if (isDescription) {
      formData.append('job_description', jobText);
    }
    if (isUrl) {
      formData.append('job_url', jobUrl);
    }

    try {
      setUploadProgress(0);
      const response = await axios.post(`http://localhost:8000/analyze/${analyzePath}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent: any) => {
          const percent = Math.round(
            progressEvent ? (progressEvent.loaded * 100) / progressEvent.total : 0
          );
          setUploadProgress(percent);
        }
      });

      setResult({
        score: response.data.match_score,
        feedback: response.data.feedback,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0">
        <ParticlesBg type="lines" />
      </div>

      {/* Main content */}
      <div className="relative max-w-3xl p-6 rounded-2xl shadow-md space-y-6 w-full">
        <h1 className="text-2xl font-bold text-yellow-500 text-center">Smart Resume Analyzer</h1>

        <FileUpload setFile={setResumeFile} />

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-gray-800 rounded-full p-1 shadow-md">
            <button
              onClick={() => setSelectedTab('url')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedTab === 'url'
                  ? 'bg-white text-black shadow'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Paste Job URL
            </button>
            <button
              onClick={() => setSelectedTab('description')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedTab === 'description'
                  ? 'bg-white text-black shadow'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Paste Job Description
            </button>
          </div>
        </div>

        {/* Tab content */}
        {selectedTab === 'description' && (
          <TextAreaInput
            label="Job Description"
            value={jobText}
            setValue={setJobText}
          />
        )}

        {selectedTab === 'url' && (
          <input
            type="url"
            className="w-full p-2 border rounded-lg bg-white"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            // className="w-full border rounded-lg p-2"
            placeholder="https://example.com/job-posting"
          />
        )}

        {/* Upload progress */}
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

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