import React from "react";

export default function TestVideo() {
  return (
    <div className="test-video-page">
      <video className="video-background" autoPlay loop muted playsInline>
        <source src="https://imgur.com/8EjBHTB.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="content-box">
        <h1 className="title">Testing Video Background</h1>
      </div>

      <style jsx>{`
        .test-video-page {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .video-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }

        .content-box {
          position: relative;
          z-index: 2;
          color: white;
          font-size: 3em;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </div>
  );
}
