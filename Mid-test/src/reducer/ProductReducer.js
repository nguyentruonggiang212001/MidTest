export const productsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS": {
      console.log(action.payload);
      return {
        ...state,
        products: action.payload,
      };
    }
    case "ADD_PRODUCTS": {
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    }
    case "UPDATE_PRODUCTS": {
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    }
    case "REMOVE_PRODUCTS": {
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      };
    }
    default:
      return state;
  }
};
