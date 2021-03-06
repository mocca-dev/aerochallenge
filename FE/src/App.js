import React, { useReducer } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import OfflineToast from "./components/OfflineToast";
import Context from "./context";
import appReducer from "./reducer";

function App({ sWPromise }) {
  const [state, dispatch] = useReducer(appReducer, {
    isSynchronized: false,
    shopCart: { productList: [], totalCount: 0, totalPrice: 0 },
    productList: [],
    metaData: {}
  });

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Header />
      <OfflineToast sWPromise={sWPromise} />
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
