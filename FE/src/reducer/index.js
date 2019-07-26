function appReducer(state, action) {
  console.log(state);

  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        shopCart: {
          ...state.shopCart,
          productList: [...state.shopCart.productList, action.payload]
        }
      };
    case "ADD_PRODUCT_UNIT":
      return {
        ...state,
        shopCart: {
          ...state.shopCart,
          productList: [
            ...state.shopCart.productList.map(
              product =>
                product.id === action.payload.id && {
                  ...product,
                  ammount: isNaN(product.ammount) ? 0 : product.ammount + 1
                }
            )
          ]
        }
      };
    default:
      return state;
  }
}

export default appReducer;
