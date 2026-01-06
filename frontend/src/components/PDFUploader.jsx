import React, { useState } from "react";

export default function PDFUploader() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const uploadPDF = async () => {
    if (!file) return alert("Select a PDF file");

    const fd = new FormData();
    fd.append("pdf", file);

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
    </div>
  );
}
