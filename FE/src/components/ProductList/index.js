import React, { useEffect, useState } from "react";
import { fetchProducts } from "./../../service";
import ProductItem from "./ProductItem";
import {} from "./index.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [metaData, setMetaData] = useState({});
  useEffect(() => {
    fetchProducts().then(resp => {
      const { products, ...metaData } = resp;
      setProducts(products);
      setMetaData(metaData);
      console.log(products, metaData);
    });
  }, []);

  return (
    <div className="list-container">
      {products &&
        products.map(product => (
          <ProductItem key={product.id} data={product} />
        ))}
    </div>
  );
};

export default ProductList;
