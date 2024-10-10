import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

export default function DropdownButton({ className = '', style = {}, onClick, isOpen }) {
  return (
    <>
      <style jsx>{`
        .dropdown-button {
          background: none;
          border: none;
          font-size: 0.7em;
          color: #808080;
          display: flex;
          align-items: center;
          cursor: pointer;
          font-weight: bold;
          padding-right:3.1%;
        }

        .dropdown-button:hover {
          color: #333;
        }

        .icon-wrapper {
          margin-left: 10px;
        }
      `}</style>

      <button
        className={`dropdown-button ${className}`}
        style={style}
        onClick={onClick}
      >
        {isOpen ? "See Less" : "See More"}
        <span className="icon-wrapper">
          <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
        </span>
      </button>
    </>
  );
}
