import PDFUploader from "./components/PDFUploader";
import Searcher from "./components/Searcher";

function App() {
  return (
    <div style={{ padding: "40px" }}>
      <center>
        <h1>Enterprise SOP Agent</h1>
        <PDFUploader />
        <Searcher />
      </center>
    </div>
  );
}

export default App;
