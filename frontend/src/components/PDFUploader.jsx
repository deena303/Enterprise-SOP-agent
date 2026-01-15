import React, { useState } from "react";
import "../styles/PDFUploader.css";

export default function PDFUploader() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadPDF = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    setLoading(true);
    setError("");
    setMsg("");

    const fd = new FormData();
    fd.append("pdf", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: fd
      });

      const data = await res.json();
      setMsg(JSON.stringify(data, null, 2));
      setFile(null);
      document.getElementById("file-input").value = "";
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Please select a valid PDF file");
      setFile(null);
    }
  };

  return (
    <div className="uploader-container">
      <div className="upload-zone">
        <input
          id="file-input"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="file-input"
        />
        <label htmlFor="file-input" className="upload-label">
          <span className="upload-icon">📤</span>
          <span className="upload-text">
            {file ? file.name : "Click or drag PDF here"}
          </span>
          <span className="upload-hint">PDF files only</span>
        </label>
      </div>

      {error && <div className="error-message">{error}</div>}

      <button 
        onClick={uploadPDF} 
        disabled={!file || loading}
        className="upload-button"
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            Processing...
          </>
        ) : (
          <>
            🚀 Upload & Process
          </>
        )}
      </button>

      {msg && (
        <div className="response-box">
          <div className="response-header">✅ Upload Response</div>
          <pre className="response-content">{msg}</pre>
        </div>
      )}
    </div>
  );
}
