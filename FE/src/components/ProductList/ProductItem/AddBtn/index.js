import React from "react";
import {} from "./index.css";

const AddBtn = ({ add }) => {
  return (
    <button className="add-btn" type="button" onClick={() => add()}>
      Agregar al carrito
    </button>
  );
};

export default AddBtn;
