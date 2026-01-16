import React, { useState } from "react";
<<<<<<< HEAD
import "../styles/PDFUploader.css";
=======
>>>>>>> cace90b7abc48e10eb2352e88a308b25b904c3d5

export default function PDFUploader() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
<<<<<<< HEAD
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
=======

  const uploadPDF = async () => {
    if (!file) return alert("Select a PDF file");
>>>>>>> cace90b7abc48e10eb2352e88a308b25b904c3d5

    const fd = new FormData();
    fd.append("pdf", file);

<<<<<<< HEAD
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
=======
    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd
    });

    const data = await res.json();
    setMsg(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={uploadPDF} style={{ padding: "10px" }}>
        Upload PDF
      </button>

      <pre>{msg}</pre>
>>>>>>> cace90b7abc48e10eb2352e88a308b25b904c3d5
    </div>
  );
}
