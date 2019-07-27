import React, { useReducer } from "react";
import Header from "./components/Header";
import SectionTitle from "./components/SectionTitle";
import ProductList from "./components/ProductList";
import Context from "./context";
import appReducer from "./reducer";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    shopCart: { productList: [], totalCount: 0, totalPrice: 0 },
    productList: [],
    metaData: {}
  });

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Header />
      <section className="main-container">
        <SectionTitle title={"Almacén"} />
        <ProductList />
      </section>
    </Context.Provider>
  );
}

export default App;
