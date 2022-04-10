import {
  GET_CATALOG,
  GET_SYMBOLS,
  GET_PRODUCT_AVAILABLE,
  NEW_TOTAL_PRICE,
  ADD_TO_CART,
  REMOVE_ITEM,
  ADD_QUANTITY,
  REMOVE_QUANTITY,
  CHANGE_CURRENCY,
  ADD_FIRST_ATTRIBUTE,
  ADD_SECOND_ATTRIBUTE,
  ADD_THIRD_ATTRIBUTE
} from "./action-types/cart-actions";

export const getSymbols = payload => {
  return {
    type: GET_SYMBOLS,
    payload
  };
};

export const getCatalog = payload => {
  return {
    type: GET_CATALOG,
    payload
  };
};

export const getProductAvailable = payload => {
  return {
    type: GET_PRODUCT_AVAILABLE,
    payload
  };
};

export const setNewTotalPrice = () => {
  return {
    type: NEW_TOTAL_PRICE
  };
};

export const addToCart = id => {
  return {
    type: ADD_TO_CART,
    id
  };
};

export const removeItem = id => {
  return {
    type: REMOVE_ITEM,
    id
  };
};

export const addQuantity = id => {
  return {
    type: ADD_QUANTITY,
    id
  };
};

export const removeQuantity = id => {
  return {
    type: REMOVE_QUANTITY,
    id
  };
};

export const changeCurrency = value => {
  return {
    type: CHANGE_CURRENCY,
    value
  };
};

export const addFirstAttribute = id => {
  return {
    type: ADD_FIRST_ATTRIBUTE,
    id
  };
};

export const addSecondAttribute = id => {
  return {
    type: ADD_SECOND_ATTRIBUTE,
    id
  };
};

export const addThirdAttribute = id => {
  return {
    type: ADD_THIRD_ATTRIBUTE,
    id
  };
};
