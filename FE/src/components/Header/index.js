import React, { useContext } from "react";
import Context from "./../../context";
import {} from "./index.css";
import { LogoApp, ShopCartIcon } from "./../Icons/icons";

const Header = () => {
  const { state } = useContext(Context);
  const { totalCount, totalPrice } = state.shopCart;
  return (
    <header>
      <span className="header-container center-width">
        <span className="header-item-container">
          <LogoApp />
          EZhop
        </span>
        <span className="header-item-container">
          <span>${totalPrice.toFixed(2)}</span>
          <span className="shopping-cart">
            {!!totalCount && (
              <span className="shopping-cart-badge">{totalCount}</span>
            )}
            <ShopCartIcon />
          </span>
        </span>
      </span>
    </header>
  );
};

export default Header;
