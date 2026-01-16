import React, { useState } from "react";
import PDFUploader from "./components/PDFUploader";
import Searcher from "./components/Searcher";
import Login from "./components/Login";
import "./styles/App.css";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <span className="brand-icon">🧠</span>
            <h1>OpsMind AI</h1>
          </div>
          <div className="navbar-user">
            <span className="user-info">Welcome, {user.name}! 👋</span>
            <button onClick={handleLogout} className="logout-btn">
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="dashboard-container">
        <div className="dashboard-content">
          <section className="section-hero">
            <h1 className="hero-title">Enterprise SOP Agent</h1>
            <p className="hero-subtitle">
              Your AI-powered assistant for retrieving and analyzing Standard Operating Procedures
            </p>
          </section>

          <div className="sections-grid">
            <section className="section-card section-upload">
              <div className="section-header">
                <span className="section-icon">📄</span>
                <h2>Knowledge Ingestion</h2>
              </div>
              <p className="section-desc">Upload and process PDF documents</p>
              <PDFUploader />
            </section>

            <section className="section-card section-search">
              <div className="section-header">
                <span className="section-icon">🔍</span>
                <h2>Vector Search</h2>
              </div>
              <p className="section-desc">Find relevant SOP chunks instantly</p>
              <Searcher />
            </section>
          </div>
        </div>

        <div className="background-elements">
          <div className="gradient-blob blob-1"></div>
          <div className="gradient-blob blob-2"></div>
          <div className="gradient-blob blob-3"></div>
        </div>
      </main>
    </div>
  );
}

export default App;
