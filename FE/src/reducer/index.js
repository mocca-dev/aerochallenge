function appReducer(state, action) {
  switch (action.type) {
    case "ADD_PRODUCT": {
      return {
        ...state,
        shopCart: {
          ...state.shopCart,
          productList: [...state.shopCart.productList, action.payload],
          totalCount: state.shopCart.totalCount + 1
        }
      };
    }
    case "ADD_PRODUCT_UNIT": {
      return {
        ...state,
        shopCart: {
          ...state.shopCart,
          totalCount: state.shopCart.totalCount + 1,
          productList: [
            ...state.shopCart.productList.map(
              product =>
                product.id === action.payload.id && {
                  ...product,
                  ammount:
                    product.ammount || isNaN(product.ammount)
                      ? 1
                      : product.ammount + 1
                }
            )
          ]
        }
      };
    }
    case "REMOVE_PRODUCT_UNIT": {
      if (state.shopCart.totalCount === 1) {
        return state;
      }
      return {
        ...state,
        shopCart: {
          ...state.shopCart,
          totalCount: state.shopCart.totalCount - 1,
          productList: [
            ...state.shopCart.productList.map(
              product =>
                product.id === action.payload.id && {
                  ...product,
                  ammount: isNaN(product.ammount) ? 0 : product.ammount - 1
                }
            )
          ]
        }
      };
    }
    default:
      return state;
  }
}

export default appReducer;
