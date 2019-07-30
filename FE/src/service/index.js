export const fetchProductsByPage = async page => {
  const resp = await fetch(
    `https://challenge-api.aerolab.co/products?page=${page}`
  );
  if (resp.status !== 400) {
    const products = await resp.json();
    return products;
  } else {
    return [];
  }
};
