export const fetchProducts = async () => {
  const resp = await fetch(`https://challenge-api.aerolab.co/products`);
  const products = await resp.json();

  return products;
};
