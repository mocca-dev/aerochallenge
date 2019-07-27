import React, { useContext } from "react";
import Context from "./../../context";
import {} from "./index.css";

const Header = () => {
  const { state } = useContext(Context);

  return (
    <header>
      <span className="header-item-container">
        <img className="logo-img" src="./assets/CombinedShape.png" alt="logo" />
        EZhop
      </span>
      <span className="header-item-container">
        <span>${state.shopCart.totalPrice.toFixed(2)}</span>
        <span className="shopping-cart">
          <span className="shopping-cart-badge">
            {state.shopCart.totalCount}
          </span>
          <img
            className="shopping-cart-img"
            src="./assets/shopping-cart.png"
            height="22px"
            width="21px"
            alt="shopping-cart"
          />
        </span>
      </span>
    </header>
  );
};

export default Header;
