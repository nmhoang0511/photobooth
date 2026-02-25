import { useState } from "react";
import Camera from "./Camera";
import Editor from "./Editor";

export default function App() {
  const [image, setImage] = useState(null);

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h1>📸 Photobooth</h1>
      {!image ? (
        <Camera onCapture={setImage} />
      ) : (
        <Editor image={image} onReset={() => setImage(null)} />
      )}
    </div>
  );
}
