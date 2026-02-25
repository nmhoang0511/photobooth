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
        width={400}
        mirrored
      />
      {countdown && <h2>{countdown}</h2>}
      <button onClick={startCapture}>Chụp (3s)</button>
    </div>
  );
}
