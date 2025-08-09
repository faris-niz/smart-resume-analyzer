function FileUpload(props: { setFile: any }) {
  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      props.setFile(file); // send to parent
    } else {
      alert('Please upload a PDF file.');
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Upload Resume (PDF)</label>
      <input type="file" accept=".pdf" onChange={handleChange} />
    </div>
  );
}
export default FileUpload;
