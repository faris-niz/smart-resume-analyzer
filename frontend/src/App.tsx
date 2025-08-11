import { useState } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload.tsx';
import TextAreaInput from './components/TextAreaInput.tsx';
import AnalysisResult from './components/AnalysisResult.tsx';
import ParticlesBg from 'particles-bg';

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobText, setJobText] = useState('');
  const [result, setResult] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleAnalyze = async () => {
    if (!resumeFile || !jobText.trim()) {
      alert('Please upload a resume and enter a job description.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('job_description', jobText);

    try {
      setUploadProgress(0); // Reset progress before upload
      const response = await axios.post('http://localhost:8000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent: any) => {
          const percent = Math.round(progressEvent ? 0 : (progressEvent.loaded * 100) / progressEvent.total);
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
      <div className="flex justify-center">
        <ParticlesBg type="lines" bg={true} />
        <div className="max-w-3xl bg-white p-6 rounded-2xl shadow-md space-y-6 " style={{minHeight: '100vh'}}>
          <h1 className="text-2xl font-bold text-center">Smart Resume Analyzer</h1>
          
          <FileUpload setFile={setResumeFile} />
          <TextAreaInput label="Job Description" value={jobText} setValue={setJobText} />

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
            style={{backgroundColor: 'blue'}}
          >
            Analyze
          </button>

          {result && <AnalysisResult result={result} />}
        </div>
      </div>
  );
}

export default App;

// import { useState } from 'react';
// import FileUpload from './components/FileUpload.tsx';
// import TextAreaInput from './components/TextAreaInput.tsx';
// import AnalysisResult from './components/AnalysisResult.tsx';

// function App() {
//   const [resumeFile, setResumeFile] = useState(null);
//   const [jobText, setJobText] = useState('');
//   const [result, setResult] = useState({});

//   const handleAnalyze = async () => {
//     if (!resumeFile || !jobText.trim()) {
//       alert('Please upload a resume and enter a job description.');
//       return;
//     }
//     console.log('handleAnalyze');
//     const formData = new FormData();
//     formData.append('resume', resumeFile); // File object
//     formData.append('job_description', jobText);

//     const response = await fetch('http://localhost:8000/analyze', {
//       method: 'POST',
//       body: formData,
//     });
//     const data = await response.json();

//     setResult({
//       score: data.match_score,
//       feedback: data.feedback,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-6">
//         <h1 className="text-2xl font-bold text-center">Smart Resume Analyzer</h1>
//         <FileUpload setFile={setResumeFile} />
//         <TextAreaInput label="Job Description" value={jobText} setValue={setJobText} />
//         <button
//           onClick={handleAnalyze}
//           className="w-full bg-black-600 text-white p-2 rounded-lg hover:bg-blue-700 transition" style={{backgroundColor: 'blue'}}
//         >
//           Analyze
//         </button>
//         {result && <AnalysisResult result={result} />}
//       </div>
//     </div>
//   );
// }

// export default App;
