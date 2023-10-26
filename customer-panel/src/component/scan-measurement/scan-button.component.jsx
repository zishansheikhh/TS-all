import React, { useRef, useState } from 'react';

const MeasurementCapture = () => {
  const videoRef = useRef(null);
  const [imageData, setImageData] = useState(null);

  const handleCapture = async () => {
    const video = videoRef.current;

    // Create a canvas element to draw the video frame
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the image data from the canvas
    const dataUrl = canvas.toDataURL('image/png');
    setImageData(dataUrl);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay></video>
      <button onClick={handleCapture}>Capture Image</button>
      {imageData && <img src={imageData} alt="Captured" />}
    </div>
  );
};

export default MeasurementCapture;