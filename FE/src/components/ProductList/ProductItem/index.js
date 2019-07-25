import React from "react";
import {} from "./index.css";
import Price from "./Price";

const ProductItem = ({ data }) => {
  const { name, price, originalPrice, presentation, photo, brand } = data;
  return (
    <div className="item-container">
      <div>
        <img src={photo} alt="product-pic" />
      </div>
      <div className="item-name">{name}</div>
      <Price price={price} originalPrice={originalPrice} ammount={0} />
    </div>
  );
};

export default ProductItem;
