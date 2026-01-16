import { useState } from "react";
<<<<<<< HEAD
import "../styles/Searcher.css";
=======
>>>>>>> cace90b7abc48e10eb2352e88a308b25b904c3d5

const Searcher = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
<<<<<<< HEAD
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        
        setLoading(true);
        setError("");
        setHasSearched(true);

        try {
            const res = await fetch("http://localhost:5000/api/search", {
=======

    const handleSearch = async () => {
        if (!query) return;
        setLoading(true);
        try {
            const res = await fetch("/api/search", {
>>>>>>> cace90b7abc48e10eb2352e88a308b25b904c3d5
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });
<<<<<<< HEAD
            
            if (!res.ok) throw new Error("Search failed");
            
            const data = await res.json();
            setResults(data.result ? [data.result] : []);
        } catch (err) {
            console.error("Search failed:", err);
            setError("Search failed. Please try again.");
            setResults([]);
=======
            const data = await res.json();
            setResults(data.results || []);
        } catch (err) {
            console.error("Search failed:", err);
            alert("Search failed. Check console.");
>>>>>>> cace90b7abc48e10eb2352e88a308b25b904c3d5
        } finally {
            setLoading(false);
        }
    };

    return (
<<<<<<< HEAD
        <div className="searcher-container">
            <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-group">
                    <input
                        type="text"
                        placeholder="Ask a question... (e.g., 'How do I process a refund?')"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input"
                        disabled={loading}
                    />
                    <button 
                        type="submit" 
                        className="search-button"
                        disabled={!query.trim() || loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                            </>
                        ) : (
                            <>🔍</>
                        )}
                    </button>
                </div>
            </form>

            {error && <div className="error-message">{error}</div>}

            <div className="results-container">
                {loading && (
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Searching through SOP documents...</p>
                    </div>
                )}

                {!loading && results.length > 0 && (
                    <div className="results-list">
                        <div className="results-header">
                            Found <span className="result-count">{results.length}</span> Result
                        </div>
                        {results.map((res, index) => (
                            <div key={index} className="result-item">
                                <div className="result-meta">
                                    <span className="result-badge">
                                        📋 SOP Chunk #{index + 1}
                                    </span>
                                    <span className="result-score">
                                        Relevance: <strong>{(res.score * 100).toFixed(1)}%</strong>
                                    </span>
                                </div>
                                <div className="result-text">{res.text}</div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && hasSearched && results.length === 0 && !error && (
                    <div className="empty-state">
                        <span className="empty-icon">🔍</span>
                        <p>No matching SOP documents found</p>
                        <p className="empty-hint">Try different keywords or upload more documents</p>
                    </div>
                )}

                {!hasSearched && !loading && (
                    <div className="initial-state">
                        <span className="initial-icon">💡</span>
                        <p>Start by asking a question about your SOPs</p>
                        <p className="initial-hint">The AI will search through uploaded documents to find relevant information</p>
                    </div>
=======
        <div style={{ marginTop: "40px", borderTop: "1px solid #ccc", paddingTop: "20px" }}>
            <h2>Week 2 — SOP Vector Search</h2>
            <input
                type="text"
                placeholder="Ask a question..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: "300px", padding: "10px" }}
            />
            <button onClick={handleSearch} style={{ padding: "10px 20px", marginLeft: "10px" }}>
                {loading ? "Searching..." : "Search"}
            </button>

            <div style={{ marginTop: "20px" }}>
                {results.length > 0 ? (
                    results.map((res, index) => (
                        <div key={index} style={{ marginBottom: "15px", padding: "10px", background: "#f9f9f9", borderRadius: "5px" }}>
                            <p><strong>Result {index + 1} (Score: {res.score.toFixed(4)})</strong></p>
                            <p>{res.text}</p>
                        </div>
                    ))
                ) : (
                    !loading && <p>No results yet.</p>
>>>>>>> cace90b7abc48e10eb2352e88a308b25b904c3d5
                )}
            </div>
        </div>
    );
};

export default Searcher;
