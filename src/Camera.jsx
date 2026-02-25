import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

export default function Camera({ onCapture }) {
  const webcamRef = useRef(null);
  const timerRef = useRef(null);
  const [countdown, setCountdown] = useState(null);
  const [flash, setFlash] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const startCapture = () => {
    if (isCapturing) return;

    setIsCapturing(true);
    let time = 3;
    setCountdown(time);

    timerRef.current = setInterval(() => {
      time--;
      setCountdown(time);

      if (time === 0) {
        clearInterval(timerRef.current);
        
        setFlash(true);
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc);

        setTimeout(() => {
          setFlash(false);
          setCountdown(null);
          setIsCapturing(false);
        }, 200);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "500px", margin: "0 auto" }}>
      {flash && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "white",
            opacity: 0.9,
            borderRadius: "25px",
            zIndex: 10,
            transition: "opacity 0.2s"
          }}
        />
      )}

      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        mirrored={true}
        style={{
          width: "100%",
          borderRadius: "25px",
          display: "block"
        }}
      />

      {countdown !== null && countdown > 0 && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "5rem",
          color: "white",
          fontWeight: "bold",
          textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
          zIndex: 5
        }}>
          {countdown}
        </div>
      )}

      <button 
        className="primary-btn" 
        onClick={startCapture}
        disabled={isCapturing}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: isCapturing ? "not-allowed" : "pointer",
          opacity: isCapturing ? 0.5 : 1
        }}
      >
        {isCapturing ? "Đang đợi..." : "📸 Chụp ảnh"}
      </button>
    </div>
  );
}
