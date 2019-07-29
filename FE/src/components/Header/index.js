import React, { useContext } from "react";
import Context from "./../../context";
import {} from "./index.css";

const Header = () => {
  const { state } = useContext(Context);
  const { totalCount, totalPrice } = state.shopCart;
  return (
    <header>
      <span className="header-container center-width">
        <span className="header-item-container">
          <img className="logo-img" src="./assets/logo.png" alt="logo" />
          EZhop
        </span>
        <span className="header-item-container">
          <span>${totalPrice.toFixed(2)}</span>
          <span className="shopping-cart">
            {!!totalCount && (
              <span className="shopping-cart-badge">{totalCount}</span>
            )}
            <img
              className="shopping-cart-img"
              src="./assets/shopping-cart.png"
              height="22px"
              width="21px"
              alt="shopping-cart"
            />
          </span>
        </span>
      </span>
    </header>
  );
};

export default Header;
