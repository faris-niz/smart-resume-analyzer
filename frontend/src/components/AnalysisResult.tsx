function AnalysisResult( props: {result: any} ) {
  console.log('result is ',props.result);
  
  return (
    <div className="p-4 border rounded-lg bg-green-50">
      <p><strong>Match Score:</strong> {props.result.score}/100</p>
      <pre className="whitespace-pre-wrap">
        <p style={{ whiteSpace: 'pre-wrap' }}><strong>Feedback:</strong> {props.result.feedback}</p>
      </pre>
    </div>
  );
}

export default AnalysisResult;
