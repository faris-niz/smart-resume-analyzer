import { useRef, useState } from "react";

interface FileUploadProps {
  setFile: (file: File | null) => void;
}

export default function FileUpload({ setFile }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setFileName(file.name);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFile(file);
      setFileName(file.name);
    }
  };

  return (
    <div className="w-full">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-xl cursor-pointer transition
          ${
            isDragging
              ? "border-blue-400 bg-gray-800"
              : "border-gray-700 bg-gray-900 hover:border-blue-500 hover:bg-gray-800"
          }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-gray-300 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6h.1a5 5 0 010 10H7z"
          />
        </svg>
        <p className="text-gray-300">
          {isDragging ? "Drop your file here" : "Click to upload or drag & drop"}
        </p>
        <p className="text-sm text-gray-500">PDF, DOC, DOCX (max 10MB)</p>
      </div>

      {/* Show file name after selection */}
      {fileName && (
        <p className="mt-2 text-sm text-green-400 text-center">
          Selected: {fileName}
        </p>
      )}
    </div>
  );
}


// import { useRef } from "react";
// function FileUpload(props: { setFile: any }) {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       console.log('uploading the file1');
//     if (e.target.files && e.target.files[0]) {
//       console.log('uploading the file');
      
//       props.setFile(e.target.files[0]);
//     }
//   };

//   const handleClick = () => {
//     fileInputRef.current?.click();
//   };
//   // const handleChange = (e: any) => {
//   //   const file = e.target.files[0];
//   //   if (file && file.type === 'application/pdf') {
//   //     props.setFile(file); // send to parent
//   //   } else {
//   //     alert('Please upload a PDF file.');
//   //   }
//   // };

//   return (
//     <div
//       onClick={handleClick}
//       className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-xl cursor-pointer
//                  bg-gray-900 border-gray-700 hover:border-blue-500 hover:bg-gray-800 transition"
//     >
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         className="hidden"
//         accept=".pdf,.doc,.docx"
//       />
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-10 w-10 text-gray-300 mb-2"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6h.1a5 5 0 010 10H7z"
//         />
//       </svg>
//       <p className="text-gray-300">Click to upload or drag & drop</p>
//       <p className="text-sm text-gray-500">PDF, DOC, DOCX (max 10MB)</p>
//     </div>
//     // <div>
//     //   <label className="block text-yellow-300 font-medium mb-1">Upload Resume (PDF)</label>
//     //   <input className="text-yellow-300" type="file" accept=".pdf" onChange={handleChange} />
//     // </div>
//   );
// }
// export default FileUpload;
