export const fetchProducts = async () => {
  const url = new URL("http://localhost:3001/products");

  const resp = await fetch(url);
  const products = await resp.json();

  return products;
};
