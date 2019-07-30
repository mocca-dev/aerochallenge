import React, { useEffect, useContext, useState } from "react";
import Context from "./../../context";
import { fetchProductsByPage } from "./../../service";
import ProductItem from "./ProductItem";
import { LoadingSVG } from "./../Icons/icons";
import {} from "./index.css";

const loadShopCartFromCache = (data, dispatch) => {
  dispatch({ type: "LOAD_SHOP_CART", payload: data.productList });
};

const fetchAndLoadProductsByPage = (page, dispatch, setIsLoading) => {
  fetchProductsByPage(page).then(resp => {
    const { products, ...metaData } = resp;
    if (products && metaData) {
      dispatch({ type: "LOAD_PRODUCTS_LIST", payload: products });
      dispatch({ type: "LOAD_METADATA", payload: metaData });
      setIsLoading(false);
    }
  });
};

const ProductList = () => {
  const { state, dispatch } = useContext(Context);
  const [lastPage, setLastPage] = useState(2);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAndLoadProductsByPage(1, dispatch, setIsLoading);
  }, [dispatch]);

  useEffect(() => {
    const cachedState = JSON.parse(localStorage.getItem("shopCart"));
    if (cachedState) loadShopCartFromCache(cachedState, dispatch);
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("shopCart", JSON.stringify(state.shopCart));
  });

  useEffect(() => {
    if (
      !state.isSynchronized &&
      state.productList.length &&
      state.shopCart.productList.length
    ) {
      dispatch({ type: "SYNC_PRODUCTS_LIST" });
    }
  });

  const { productList } = state;

  return (
    <div className="list-container center-width">
      {productList.length ? (
        productList.map(product => (
          <ProductItem key={product.id} data={product} />
        ))
      ) : (
        <p> No se encontraron productos para mostrar</p>
      )}
      <div className="loaging-products-container">
        {isLoading && <LoadingSVG />}
      </div>
      <button
        className="more-btn"
        onClick={() => {
          setIsLoading(true);
          fetchAndLoadProductsByPage(lastPage, dispatch, setIsLoading);
          setLastPage(() => lastPage + 1);
        }}
        disabled={isLoading}
      >
        Cargar más productos
      </button>
    </div>
  );
};

export default ProductList;
