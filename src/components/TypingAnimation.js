import React from "react";

export default function TestTyping() {
  return (
    <>
      <div className="keyboard">
        <div className="word">
          <span className="key">Discover Lincoln</span>
        </div>
        <div className="description">
          <p>Explore Lincoln's events, attractions, and businesses. Create an account to unlock your personal dashboard, where you can organize events, add local spots, and dive into LincolnGuessr for a fun way to discover the town.</p>
        </div>
      </div>

      <style jsx>{`
        .keyboard {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 100%;
          padding: 1em;
          max-width: 700px;
          background-color: rgba(0, 0, 0, 0.6);
          border-radius: 30px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease;
          text-align: center;
        }

        .word {
          margin-bottom: 0.5em;
        }

        .key {
          font-size: 6em;
          color: white;
          font-weight: bold;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
          transition: transform 0.3s ease;
        }

        .key:hover {
          transform: translateY(-10px);
        }

        .description p {
          font-size: 1em;
          color: white;
          font-weight: normal;
          text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
        }

        .keyboard:hover {
          transform: translateY(-10px);
        }

        /* Tablet and smaller */
        @media (max-width: 768px) {
          .keyboard {
            padding: 1em;
            max-width: 90%;
          }

          .key {
            font-size: 5em;
          }

          .description p {
            font-size: 0.9em;
          }
        }

        /* Mobile screens */
        @media (max-width: 480px) {
          .keyboard {
            padding: 0.8em;
            max-width: 90%;
            border-radius: 15px;
          }

          .key {
            font-size: 2.5em;
          }

          .description p {
            font-size: 0.8em;
            line-height: 1.4;
          }
        }
      `}</style>
    </>
  );
}
