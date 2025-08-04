function TextAreaInput( props: {label: string, value: string, setValue: any} ) {
  
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{props.label}</label>
      <textarea
        className="w-full p-2 border rounded-lg min-h-[100px]"
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        placeholder="Paste the job description here..."
      />
    </div>
  );
}

export default TextAreaInput;
