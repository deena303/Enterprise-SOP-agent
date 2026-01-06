import { useState } from "react";

const Searcher = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query) return;
        setLoading(true);
            try {
            const res = await fetch("/api/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });
            const data = await res.json();
                // Backend now returns a single top result as `result`
                setResults(data.result ? [data.result] : []);
        } catch (err) {
            console.error("Search failed:", err);
            alert("Search failed. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
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
                )}
            </div>
        </div>
    );
};

export default Searcher;
