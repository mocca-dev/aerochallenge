import React from "react";
import {} from "./index.css";

const Header = () => {
  return (
    <header>
      <span className="header-item-container">
        <img className="logo-img" src="./assets/CombinedShape.png" alt="logo" />
        EZhop
      </span>
      <span className="header-item-container">
        <span>$2,345</span>
        <img
          className="shopping-cart-img"
          src="./assets/shopping-cart.png"
          height="22px"
          width="21px"
          alt="shopping-cart"
        />
      </span>
    </header>
  );
};

export default Header;
