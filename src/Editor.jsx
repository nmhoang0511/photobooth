import { useEffect, useRef } from "react";

export default function Editor({ image, onReset }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = image;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
  }, [image]);

  const downloadImage = () => {
    const link = document.createElement("a");
    link.download = "photobooth.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div>
      <canvas ref={canvasRef} />

      <div>
        <button className="primary-btn" onClick={downloadImage}>
          Tải ảnh
        </button>

        <button className="secondary-btn" onClick={onReset}>
          Chụp lại
        </button>
      </div>
    </div>
  );
}
