import { RefObject, useRef, useState } from "react";

function App() {
  const fileInputRef: RefObject<HTMLInputElement> = useRef(null);
  const [jsonContent, setJsonContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    setLoading(true);

    if (!file) {
      setError("No file selected");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;

      if (typeof text !== "string") {
        setError("Invalid file. Please load a JSON file.");
        return;
      }

      try {
        const stringifiedJson = JSON.stringify(JSON.parse(text), null, 2);
        setJsonContent(stringifiedJson);
      } catch (e) {
        setError("Invalid file. Please load a JSON file.");
      }
    };
    reader.readAsText(file);
  }

  function onBack() {
    setJsonContent("");
    setFileName("");
    setError(null);
    setLoading(false);
  }

  return (
    <div>
      {jsonContent.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
            justifyContent: "center",
            backgroundColor: "#242424",
          }}
        >
          <h1 style={{ marginBottom: "-5px" }}>JSON Tree Viewer</h1>
          <p>
            Simple JSON Viewer that runs completely on the client. No data
            exchange
          </p>
          <button onClick={() => fileInputRef?.current?.click()}>
            Load JSON
          </button>
          <input
            onChange={onChangeFile}
            multiple={false}
            ref={fileInputRef}
            type="file"
            hidden
          />
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "#bf0d0d" }}>{error}</p>}
        </div>
      )}
      {fileName && jsonContent.length > 0 && (
        <div style={{ marginLeft: "25px" }}>
          <button onClick={onBack}>Back</button>
          <h1>{fileName}</h1>
          <pre>{jsonContent}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
