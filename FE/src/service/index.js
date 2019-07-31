export const fetchProductsByPage = async page => {
  const resp = await fetch(
    `https://challenge-api.aerolab.co/products?page=${page}`
  );
  const { status } = resp;

  if (status !== 400) {
    const data = await resp.json();
    return { status, data };
  } else {
    return { status, data: [] };
  }
};
