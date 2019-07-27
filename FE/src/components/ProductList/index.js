import React, { useEffect, useContext } from "react";
import Context from "./../../context";
import { fetchProducts } from "./../../service";
import ProductItem from "./ProductItem";
import {} from "./index.css";

const ProductList = () => {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    fetchProducts().then(resp => {
      const { products, ...metaData } = resp;
      dispatch({ type: "LOAD_PRODUCTS_LIST", payload: products });
      dispatch({ type: "LOAD_METADATA", payload: metaData });
    });
  }, [dispatch]);

  const { productList } = state;

  return (
    <div className="list-container">
      {productList &&
        productList.map(product => (
          <ProductItem key={product.id} data={product} />
        ))}
    </div>
  );
};

export default ProductList;
