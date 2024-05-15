import React from "react";
import "./customAlert.css";

const customAlert = ({ message, onClose }) => {
  return (
    <div className="custom-alert">
      <div className="custom-alert-content">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default customAlert;