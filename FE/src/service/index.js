export const fetchProductsByPage = async page => {
  // const resp = await fetch(`http://localhost:3001/products?page=${page}`);
  const resp = await fetch(
    `https://challenge-api.aerolab.co/products?page=${page}`
  );
  const products = await resp.json();

  return products;
};
