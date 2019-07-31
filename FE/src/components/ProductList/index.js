import React, { useEffect, useContext, useState, useCallback } from "react";
import Context from "./../../context";
import { fetchProductsByPage } from "./../../service";
import ProductItem from "./ProductItem";
import { LoadingSVG } from "./../Icons/icons";
import {} from "./index.css";

const loadShopCartFromCache = (data, dispatch) => {
  dispatch({ type: "LOAD_SHOP_CART", payload: data.productList });
};

const fetchAndLoadProductsByPage = (
  page,
  dispatch,
  setIsLoading,
  setLastPage,
  setNoMore
) => {
  setIsLoading(true);
  fetchProductsByPage(page).then(resp => {
    const { data, status } = resp;
    if (status === 200) {
      const { products, ...metaData } = data;
      if (products && metaData) {
        dispatch({ type: "LOAD_PRODUCTS_LIST", payload: products });
        dispatch({ type: "LOAD_METADATA", payload: metaData });
        setIsLoading(false);
        if (setLastPage) setLastPage(page => page + 1);
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setNoMore(true);
    }
  });
};

const ProductList = () => {
  const { state, dispatch } = useContext(Context);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [noMore, setNoMore] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = Math.round(document.documentElement.scrollTop);
    if (
      window.innerHeight + scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    fetchAndLoadProductsByPage(
      lastPage,
      dispatch,
      setIsLoading,
      setLastPage,
      setNoMore
    );
  }, [lastPage, dispatch, setIsLoading, setLastPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, false);
    return function() {
      window.removeEventListener("scroll", handleScroll, false);
    };
  }, [handleScroll]);

  useEffect(() => {
    fetchAndLoadProductsByPage(
      1,
      dispatch,
      setIsLoading,
      setLastPage,
      setNoMore
    );
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
    <ul className="list-container center-width">
      {productList.length ? (
        productList.map(product => (
          <ProductItem key={product.id} data={product} />
        ))
      ) : (
        <p> No se encontraron productos para mostrar</p>
      )}
      <div className="loaging-products-container">
        {isLoading && <LoadingSVG />}
        {noMore && <p>No se encontraron mas productos para mostrar</p>}
      </div>
    </ul>
  );
};

export default ProductList;
