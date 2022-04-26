import {
  GET_CATALOG,
  GET_CURRENCY,
  GET_PRODUCT_AVAILABLE,
  ADD_TO_CART,
  REMOVE_ITEM,
  ADD_QUANTITY,
  REMOVE_QUANTITY,
  CHANGE_CURRENCY,
  ADD_FIRST_ATTRIBUTE,
  ADD_SECOND_ATTRIBUTE,
  ADD_THIRD_ATTRIBUTE,
  SET_CATEGORY
} from "./action-types/cart-actions";

export const getCurrency = payload => {
  return {
    type: GET_CURRENCY,
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

export const addToCart = payload => {
  return {
    type: ADD_TO_CART,
    payload
  };
};

export const removeItem = payload => {
  return {
    type: REMOVE_ITEM,
    payload
  };
};

export const addQuantity = payload => {
  return {
    type: ADD_QUANTITY,
    payload
  };
};

export const removeQuantity = payload => {
  return {
    type: REMOVE_QUANTITY,
    payload
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

export const addSecondAttribute = value => {
  return {
    type: ADD_SECOND_ATTRIBUTE,
    value
  };
};

export const addThirdAttribute = value => {
  return {
    type: ADD_THIRD_ATTRIBUTE,
    value
  };
};

export const setCategory = value => {
  return {
    type: SET_CATEGORY,
    value
  };
};
