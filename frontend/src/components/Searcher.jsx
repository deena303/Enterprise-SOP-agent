import { useState } from "react";
import "../styles/Searcher.css";

const Searcher = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
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
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });
            
            if (!res.ok) throw new Error("Search failed");
            
            const data = await res.json();
            setResults(data.result ? [data.result] : []);
        } catch (err) {
            console.error("Search failed:", err);
            setError("Search failed. Please try again.");
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
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
                )}
            </div>
        </div>
    );
};

export default Searcher;
