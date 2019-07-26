import React, { useState } from "react";
import {} from "./index.css";
import Price from "./Price";
import AddBtn from "./AddBtn";
import UnitsBtn from "./UnitsBtn";

const ProductItem = ({ data }) => {
  const [showAddBtn, setShowAddBtn] = useState(true);
  const [showRemove, setShowRemove] = useState(false);
  const [count, setCount] = useState(1);
  const { name, price, originalPrice, presentation, photo, brand } = data;
  return (
    <div className="item-container">
      {showRemove && (
        <button
          className="remove-btn"
          onClick={() => {
            setCount(0);
            setShowAddBtn(true);
            setShowRemove(false);
          }}
        >
          X
        </button>
      )}
      <div>
        <img src={photo} alt="product-pic" />
      </div>
      <div className="item-name">{name}</div>
      <Price price={price} originalPrice={originalPrice} ammount={0} />
      {showAddBtn ? (
        <AddBtn
          add={() => {
            setCount(1);
            setShowAddBtn(false);
            setShowRemove(true);
          }}
        />
      ) : (
        <UnitsBtn
          count={count}
          plus={() => setCount(() => count + 1)}
          minus={() => count && setCount(() => count - 1)}
        />
      )}
    </div>
  );
};

export default ProductItem;
