import { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function Camera({ onCapture }) {
  const webcamRef = useRef(null);
  const [countdown, setCountdown] = useState(null);

  const startCapture = () => {
    let time = 3;
    setCountdown(time);

    const interval = setInterval(() => {
      time--;
      setCountdown(time);

      if (time === 0) {
        clearInterval(interval);
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc);
      }
    }, 1000);
  };
  return (
  <div>
    <Webcam
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      mirrored
    />

    {countdown && countdown > 0 && (
      <div className="countdown">{countdown}</div>
    )}

    <button className="primary-btn" onClick={startCapture}>
      Chụp ảnh
    </button>
  </div>
);
