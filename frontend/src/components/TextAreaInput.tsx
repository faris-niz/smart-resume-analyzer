// components/TextAreaInput.tsx
import React from "react";

interface TextAreaInputProps {
  label: string;
  value: string;
  setValue: (val: string) => void;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ label, value, setValue }) => {
  return (
    <div className="relative w-full">
      {/* Floating Label */}
      <textarea
        id={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={6}
        placeholder=" "
        className="
          w-full px-4 pt-5 pb-2 text-gray-900 bg-gray-50 
          border border-gray-300 rounded-xl shadow-sm
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          focus:bg-white transition-all duration-200
          placeholder-transparent
        "
      />
      <label
        htmlFor={label}
        className={`
          absolute left-4 top-2.5 text-gray-500 text-sm 
          transition-all duration-200 
          ${value ? "-translate-y-3 text-xs text-blue-600" : "top-5"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default TextAreaInput;


// function TextAreaInput( props: {label: string, value: string, setValue: any} ) {
  
//   return (
//     <div>
//       <textarea
//         className="w-full p-2 border rounded-lg min-h-[300px] bg-white"
//         value={props.value}
//         onChange={(e) => props.setValue(e.target.value)}
//         placeholder="Paste the job description here..."
//       />
//     </div>
//   );
// }

// export default TextAreaInput;
