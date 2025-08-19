// components/AnalysisResult.tsx
import React from "react";

interface AnalysisResultProps {
  result: {
    score?: number;
    feedback?: string;
  };
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  if (!result || (!result.score && !result.feedback)) return null;

  return (
    <div className="mt-6 p-6 rounded-xl bg-gray-50 border border-gray-200 shadow-sm">
      {/* Score Section */}
      {result.score !== undefined && (
        <div className="flex flex-col items-center mb-6">
          <p className="text-lg font-semibold text-gray-700">Match Score</p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${result.score}%` }}
            />
          </div>
          <span className="mt-2 text-blue-700 font-bold text-xl">
            {result.score}%
          </span>
        </div>
      )}

      {/* Feedback Section */}
      {result.feedback && (
        <div>
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Feedback
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-gray-800 leading-relaxed">
            {result.feedback.split("\n").map((line, idx) => (
              <p key={idx} className="mb-2">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResult;


// function AnalysisResult( props: {result: any} ) {
//   console.log('result is ', props.result);
  
//   return (
//     <div className="p-4 border rounded-lg bg-green-50">
//       <p><strong>Match Score:</strong> {props.result.score}/100</p>
//       <pre className="whitespace-pre-wrap">
//         <p style={{ whiteSpace: 'pre-wrap' }}><strong>Feedback:</strong> {props.result.feedback}</p>
//       </pre>
//     </div>
//   );
// }

// export default AnalysisResult;
