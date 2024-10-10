import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="background-container">
      <div className="content-box">
        <h1 className="title">Welcome to Lincoln
          <div className="aurora">
            <div className="aurora__item"></div>
            <div className="aurora__item"></div>
            <div className="aurora__item"></div>
            <div className="aurora__item"></div>
          </div>
        </h1>
      </div>

      <style jsx>{`
        :root {
          --bg: #000000;
          --clr-1: #00c2ff;
          --clr-2: #33ff8c;
          --clr-3: #ffc640;
          --clr-4: #e54cff;
          --blur: 1rem;
        }

        .content-box {
          position: relative;
          z-index: 2;
          color: white;
          font-size: 3em;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        }

        .background-container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-family: Arial, sans-serif;
          background-color: var(--bg);
          position: relative;
        }

        .aurora {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          pointer-events: none;
        }

        .aurora__item {
          position: absolute;
          width: 60vw;
          height: 60vw;
          background-color: var(--clr-1);
          border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
          filter: blur(var(--blur));
          mix-blend-mode: overlay;
          animation: aurora-border 6s ease-in-out infinite;
        }

        .aurora__item:nth-of-type(1) {
          top: -50%;
          animation: aurora-1 12s ease-in-out infinite alternate;
        }

        .aurora__item:nth-of-type(2) {
          background-color: var(--clr-3);
          right: 0;
          top: 0;
          animation: aurora-2 12s ease-in-out infinite alternate;
        }

        .aurora__item:nth-of-type(3) {
          background-color: var(--clr-2);
          left: 0;
          bottom: 0;
          animation: aurora-3 8s ease-in-out infinite alternate;
        }

        .aurora__item:nth-of-type(4) {
          background-color: var(--clr-4);
          right: 0;
          bottom: -50%;
          animation: aurora-4 24s ease-in-out infinite alternate;
        }

        @keyframes aurora-1 {
          0% { top: 0; right: 0; }
          50% { top: 100%; right: 75%; }
          75% { top: 100%; right: 25%; }
          100% { top: 0; right: 0; }
        }

        @keyframes aurora-2 {
          0% { top: -50%; left: 0%; }
          60% { top: 100%; left: 75%; }
          85% { top: 100%; left: 25%; }
          100% { top: -50%; left: 0%; }
        }

        @keyframes aurora-3 {
          0% { bottom: 0; left: 0; }
          40% { bottom: 100%; left: 75%; }
          65% { bottom: 40%; left: 50%; }
          100% { bottom: 0; left: 0; }
        }

        @keyframes aurora-4 {
          0% { bottom: -50%; right: 0; }
          50% { bottom: 0%; right: 40%; }
          90% { bottom: 50%; right: 25%; }
          100% { bottom: -50%; right: 0; }
        }

        @keyframes aurora-border {
          0% { border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%; }
          25% { border-radius: 47% 29% 39% 49% / 61% 19% 66% 26%; }
          50% { border-radius: 57% 23% 47% 72% / 63% 17% 66% 33%; }
          75% { border-radius: 28% 49% 29% 100% / 93% 20% 64% 25%; }
          100% { border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
