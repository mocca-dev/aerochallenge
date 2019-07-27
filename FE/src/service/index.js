export const fetchProductsByPage = async page => {
  const resp = await fetch(`/api/products?page=${page}`);
  const products = await resp.json();

  return products;
};
