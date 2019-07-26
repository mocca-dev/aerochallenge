import React from "react";
import {} from "./index.css";

const UnitsBtn = ({ count, plus, minus }) => {
  return (
    <span className="units-btn-container">
      <button className="units-btn" onClick={minus}>
        -
      </button>
      <span>{count}</span>
      <button className="units-btn" onClick={plus}>
        +
      </button>
    </span>
  );
};

export default UnitsBtn;
