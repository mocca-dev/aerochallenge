import React from "react";
import {} from "./index.css";

const Price = ({ price, originalPrice, ammount }) => {
  return (
    <div className="price-container">
      {ammount ? (
        <div>
          {ammount} x ${price}
        </div>
      ) : (
        <div>
          {price != originalPrice ? (
            <span>
              <span className="original-price"> ${originalPrice}</span> ${price}
            </span>
          ) : (
            <span>${price}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Price;
