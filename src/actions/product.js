export const addToCart = (cartItem) => {
  return {
    type: "ADD_TO_CART",
    cartItem,
  };
};
