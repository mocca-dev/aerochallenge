import React, { useState, useContext } from "react";
import {} from "./index.css";
import Price from "./Price";
import AddBtn from "./AddBtn";
import UnitsBtn from "./UnitsBtn";
import Context from "./../../../context";

const plus = (id, dispatch) => {
  dispatch({ type: "ADD_PRODUCT_UNIT", payload: { id } });
};
const minus = (id, dispatch) => {
  dispatch({ type: "REMOVE_PRODUCT_UNIT", payload: { id } });
};

const itemAmmount = (id, state) => {
  // const selectedItem = state.shopCart.productList.find(
  //   product => product.id === id
  // );
  // return selectedItem.ammount ? selectedItem.ammount : 1;
  return 1;
};

const ProductItem = ({ data }) => {
  const { state, dispatch } = useContext(Context);

  const [showAddBtn, setShowAddBtn] = useState(true);
  const [showRemove, setShowRemove] = useState(false);
  const [count, setCount] = useState(1);
  const { id, name, price, originalPrice, presentation, photo, brand } = data;
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
            dispatch({ type: "ADD_PRODUCT", payload: { ...data } });
          }}
        />
      ) : (
        <UnitsBtn
          count={itemAmmount(id, state)}
          plus={() => plus(id, dispatch)}
          minus={() => minus(id, dispatch)}
        />
      )}
    </div>
  );
};

export default ProductItem;
