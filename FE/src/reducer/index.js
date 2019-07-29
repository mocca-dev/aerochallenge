function calcTotalPriceAndTotalAmmount(state, id, symb) {
  const product = state.productList.find(product => product.id === id);

  let ammount = product.ammount ? product.ammount : 0;
  const newAmmount = ammount + 1 * symb;
  let totalPrice = state.shopCart.totalPrice;
  let totalCount = state.shopCart.totalCount;

  if (newAmmount >= 0) {
    totalPrice += product.price * symb;
    totalPrice = totalPrice === 0 ? totalPrice * -1 : totalPrice;
    ammount = newAmmount;
    totalCount += 1 * symb;
  }

  return { totalPrice, totalCount, ammount };
}

function appReducer(state, action) {
  switch (action.type) {
    case "LOAD_PRODUCTS_LIST": {
      return {
        ...state,
        productList: [...state.productList, ...action.payload]
      };
    }
    case "LOAD_METADATA": {
      return {
        ...state,
        metaData: action.payload
      };
    }
    case "ADD_PRODUCT": {
      let { totalPrice, totalCount } = calcTotalPriceAndTotalAmmount(
        state,
        action.payload.id,
        1
      );
      return {
        ...state,
        shopCart: {
          ...state.shopCart,
          productList: [
            ...state.shopCart.productList,
            { ...action.payload, ammount: 1 }
          ],
          totalPrice,
          totalCount
        },
        productList: [
          ...state.productList.map(product =>
            product.id === action.payload.id
              ? {
                  ...product,
                  ammount: 1
                }
              : product
          )
        ]
      };
    }
    case "LOAD_SHOP_CART": {
      let totalCount = 0,
        totalPrice = 0;

      action.payload.forEach(product => {
        totalCount += product.ammount;
        totalPrice += product.price * product.ammount;
      });

      return {
        ...state,
        shopCart: {
          ...state.shopCart,
          productList: action.payload,
          totalPrice,
          totalCount
        }
      };
    }
    case "SYNC_PRODUCTS_LIST": {
      return {
        ...state,
        isSynchronized: true,
        productList: state.productList.map(product => {
          const selectedPorduct = state.shopCart.productList.find(
            productSel => productSel.id === product.id
          );
          if (selectedPorduct) {
            return { ...product, ammount: selectedPorduct.ammount };
          }
          return { ...product };
        })
      };
    }
    case "ADD_PRODUCT_UNIT": {
      let { totalPrice, totalCount, ammount } = calcTotalPriceAndTotalAmmount(
        state,
        action.payload.id,
        1
      );
      return {
        ...state,
        shopCart: {
          ...state.shopCart,
          totalPrice,
          totalCount,
          productList: [
            ...state.shopCart.productList.map(product =>
              product.id === action.payload.id
                ? {
                    ...product,
                    ammount
                  }
                : product
            )
          ]
        },
        productList: [
          ...state.productList.map(product =>
            product.id === action.payload.id
              ? {
                  ...product,
                  ammount
                }
              : product
          )
        ]
      };
    }
    case "REMOVE_PRODUCT_UNIT": {
      const { totalPrice, totalCount, ammount } = calcTotalPriceAndTotalAmmount(
        state,
        action.payload.id,
        -1
      );
      return {
        ...state,
        shopCart: {
          ...state.shopCart,
          totalPrice,
          totalCount,
          productList: [
            ...state.shopCart.productList.map(product =>
              product.id === action.payload.id
                ? {
                    ...product,
                    ammount
                  }
                : { ...product }
            )
          ]
        },
        productList: [
          ...state.productList.map(product =>
            product.id === action.payload.id
              ? {
                  ...product,
                  ammount
                }
              : product
          )
        ]
      };
    }
    default:
      return state;
  }
}

export default appReducer;
