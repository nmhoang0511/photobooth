import { useState } from "react";
import Camera from "./Camera";
import Editor from "./Editor";

export default function App() {
  const [image, setImage] = useState(null);

  return (
    <div className="app-container">
      <h1 className="title">📸 PHOTOBOOTH</h1>

      <div className="camera-wrapper">
        {!image ? (
          <Camera onCapture={setImage} />
        ) : (
          <Editor image={image} onReset={() => setImage(null)} />
        )}
      </div>
    </div>
  );
}
