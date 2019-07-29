export const fetchProductsByPage = async page => {
  const resp = await fetch(`http://localhost:3001/products?page=${page}`);
  if (resp.status !== 400) {
    const products = await resp.json();
    return products;
  } else {
    return [];
  }
};
