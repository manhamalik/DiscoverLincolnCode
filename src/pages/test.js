// AnimatedBackground.js
import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="background-container">
 <div className="content-box">
        <h1 className="title">Welcome to Lincoln</h1>
      </div>

      <style jsx>{`
	  .content-box {
          position: relative;
          z-index: 2;
          color: white;
          font-size: 3em;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        }

        @keyframes animatedBackground {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: -445% 0;
          }
        }

        .background-container {
          height: 100vh; /* Full viewport height */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          font-family: Arial, sans-serif;
          background-image: url('https://imgur.com/0MPyu30.png');
          background-repeat: repeat-x;
          background-size: contain;
          animation: animatedBackground 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
