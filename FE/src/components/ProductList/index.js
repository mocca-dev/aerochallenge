import React, { useEffect, useContext, useState } from "react";
import Context from "./../../context";
import { fetchProductsByPage } from "./../../service";
import ProductItem from "./ProductItem";
import {} from "./index.css";

const fetchAndLoadProductsByPage = (page, dispatch) => {
  fetchProductsByPage(page).then(resp => {
    const { products, ...metaData } = resp;
    dispatch({ type: "LOAD_PRODUCTS_LIST", payload: products });
    dispatch({ type: "LOAD_METADATA", payload: metaData });
  });
};

const ProductList = () => {
  const { state, dispatch } = useContext(Context);
  const [lastPage, setLastPage] = useState(2);
  useEffect(() => {
    fetchAndLoadProductsByPage(1, dispatch);
  }, [dispatch]);

  const { productList } = state;

  return (
    <div className="list-container">
      {productList &&
        productList.map(product => (
          <ProductItem key={product.id} data={product} />
        ))}

      <button
        className="more-btn"
        onClick={() => {
          fetchAndLoadProductsByPage(lastPage, dispatch);
          setLastPage(() => lastPage + 1);
        }}
      >
        Cargar más productos
      </button>
    </div>
  );
};

export default ProductList;
