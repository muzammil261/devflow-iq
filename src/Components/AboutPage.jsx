import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AboutPage.css";

export default function AboutPage() {
  const [videoSrc, setVideoSrc] = useState("");

  // Load video from IndexedDB on component mount
  useEffect(() => {
    const request = indexedDB.open("VideoDB", 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore("videos");
    };

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction("videos", "readonly");
      const store = tx.objectStore("videos");

      const getRequest = store.get("aboutVideo");
      getRequest.onsuccess = () => {
        if (getRequest.result) {
          const videoBlob = getRequest.result;
          setVideoSrc(URL.createObjectURL(videoBlob));
        }
      };
    };
  }, []);

  // Handle video file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setVideoSrc(URL.createObjectURL(file));

    const request = indexedDB.open("VideoDB", 1);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction("videos", "readwrite");
      const store = tx.objectStore("videos");
      store.put(file, "aboutVideo");
    };
  };

  // Remove video
  const handleRemove = () => {
    setVideoSrc("");
    const request = indexedDB.open("VideoDB", 1);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction("videos", "readwrite");
      const store = tx.objectStore("videos");
      store.delete("aboutVideo");
    };
  };

  return (
    <div className="about-page">
      <h1>About My Self</h1>

      <div className="video-container">
        {/* Upload Box */}
        <div className="video-upload-box">
          <h2>Upload Video</h2>
          <input
            type="file"
            id="videoFile"
            className="upload-input"
            onChange={handleFileChange}
          />
          <label htmlFor="videoFile" className="upload-btn">
            Choose Video
          </label>
        </div>

        {/* Preview Box */}
        <div className="video-preview-box">
          {videoSrc ? (
            <>
              <video src={videoSrc} controls />
              <button className="remove-btn" onClick={handleRemove}>
                Remove
              </button>
            </>
          ) : (
            <p>No video selected</p>
          )}
        </div>
      </div>

      {/* Back to Home Button */}
      <Link to="/" className="upload-btn back-home-btn">
        Back to Home
      </Link>
    </div>
  );
}
