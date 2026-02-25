import { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function Camera({ onCapture }) {
  const webcamRef = useRef(null);
  const [countdown, setCountdown] = useState(null);
  const [flash, setFlash] = useState(false);

  const startCapture = () => {
    let time = 3;
    setCountdown(time);

    const interval = setInterval(() => {
      time--;
      setCountdown(time);

      if (time === 0) {
        clearInterval(interval);

        setFlash(true);
        setTimeout(() => setFlash(false), 200);

        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc);
      }
    }, 1000);
  };

  return (
    <div style={{ position: "relative" }}>
      {flash && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "white",
            opacity: 0.8,
            borderRadius: "25px",
            zIndex: 10
          }}
        />
      )}

      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        mirrored
        style={{
          width: "100%",
          borderRadius: "25px"
        }}
      />

      {countdown && countdown > 0 && (
        <div className="countdown">{countdown}</div>
      )}

      <button className="primary-btn" onClick={startCapture}>
        📸 Chụp ảnh
      </button>
    </div>
  );
}
