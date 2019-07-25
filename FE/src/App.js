import React from "react";
import Header from "./components/Header";
import SectionTitle from "./components/SectionTitle";
import ProductList from "./components/ProductList";

function App() {
  return (
    <>
      <Header />
      <section className="main-container">
        <SectionTitle title={"Almacén"} />
        <ProductList />
      </section>
    </>
  );
}

export default App;
