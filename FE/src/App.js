import React, { useReducer } from "react";
import Header from "./components/Header";
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
        <div className="center-width">
          <h2>Almacén</h2>
        </div>
        <ProductList />
      </section>
    </Context.Provider>
  );
}

export default App;
