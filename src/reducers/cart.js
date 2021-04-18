const defaultState = {
  cartItem: [],
};

const cart = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItem: action.cartItem,
      };

    case "REMOVE_ITEM_CART":
      return {
        ...state,
        cartItem: action.filterItem,
      };

    case "INCREASE_QTY_CART":
      return {
        ...state,
        cartItem: action.increaseQtyItem,
      };

    case "DECREASE_QTY_CART":
      return {
        ...state,
        cartItem: action.decreaseQtyItem,
      };

    case "LOCAL_STORAGE_TO_CART":
      return {
        ...state,
        cartItem: action.localCartItem,
      };
    default:
      return state;
  }
};

export default cart;
