import React from "react";

export default function TestTyping() {
  return (
    <>
      <div className="keyboard">
        <span className="key">W</span>
        <span className="key">e</span>
        <span className="key">l</span>
        <span className="key">c</span>
        <span className="key">o</span>
        <span className="key">m</span>
        <span className="key">e</span>
        <span className="space"></span> {/* Adding space between words */}
        <span className="key">t</span>
        <span className="key">o</span>
        <span className="space"></span> {/* Adding space between words */}
        <span className="key">L</span>
        <span className="key">i</span>
        <span className="key">n</span>
        <span className="key">c</span>
        <span className="key">o</span>
        <span className="key">l</span>
        <span className="key">n</span>
      </div>

      <style jsx>{`
        .keyboard {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
          background-color: black;
        }

        .key {
          font-size: 6em;
          color: white;
          font-weight: bold;
          display: inline-block;
          opacity: 0; /* Hide letters initially */
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
        }

        .space {
          width: 1em; /* Space between words */
        }

        /* Wave-like animation */
        @keyframes wave {
          0% {
            opacity: 1; /* Make letter visible at the start of the animation */
            transform: translateY(-50%);
          }
          60% {
            transform: translateY(-150%);
          }
          100% {
            opacity: 1; /* Keep letter visible after animation ends */
            transform: translateY(0);
          }
        }

        /* Apply animation with delays */
        .key:nth-child(1) {
          animation: wave 1s ease forwards;
          animation-delay: 0s;
        }

        .key:nth-child(2) {
          animation: wave 1s ease forwards;
          animation-delay: 0.1s;
        }

        .key:nth-child(3) {
          animation: wave 1s ease forwards;
          animation-delay: 0.2s;
        }

        .key:nth-child(4) {
          animation: wave 1s ease forwards;
          animation-delay: 0.3s;
        }

        .key:nth-child(5) {
          animation: wave 1s ease forwards;
          animation-delay: 0.4s;
        }

        .key:nth-child(6) {
          animation: wave 1s ease forwards;
          animation-delay: 0.5s;
        }

        .key:nth-child(7) {
          animation: wave 1s ease forwards;
          animation-delay: 0.6s;
        }

        .key:nth-child(9) {
          animation: wave 1s ease forwards;
          animation-delay: 0.7s;
        }

        .key:nth-child(10) {
          animation: wave 1s ease forwards;
          animation-delay: 0.8s;
        }

        .key:nth-child(12) {
          animation: wave 1s ease forwards;
          animation-delay: 0.9s;
        }

        .key:nth-child(13) {
          animation: wave 1s ease forwards;
          animation-delay: 1s;
        }

        .key:nth-child(14) {
          animation: wave 1s ease forwards;
          animation-delay: 1.1s;
        }

        .key:nth-child(15) {
          animation: wave 1s ease forwards;
          animation-delay: 1.2s;
        }

        .key:nth-child(16) {
          animation: wave 1s ease forwards;
          animation-delay: 1.3s;
        }

        .key:nth-child(17) {
          animation: wave 1s ease forwards;
          animation-delay: 1.4s;
        }

        .key:nth-child(18) {
          animation: wave 1s ease forwards;
          animation-delay: 1.5s;
        }
      `}</style>
    </>
  );
}
