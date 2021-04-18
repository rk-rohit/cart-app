export const removeItemCart = (filterItem) => {
  return {
    type: "REMOVE_ITEM_CART",
    filterItem,
  };
};

export const incrQtyCart = (increaseQtyItem) => {
  return {
    type: "INCREASE_QTY_CART",
    increaseQtyItem,
  };
};

export const decrQtyCart = (decreaseQtyItem) => {
  return {
    type: "DECREASE_QTY_CART",
    decreaseQtyItem,
  };
};

export const localStorageToCartItem = (localCartItem) => {
  return {
    type: "LOCAL_STORAGE_TO_CART",
    localCartItem,
  };
};
