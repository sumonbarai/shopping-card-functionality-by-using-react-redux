import {
  ADDTOCARD,
  PRODUCTFAILED,
  PRODUCTREQUEST,
  PRODUCTSUCCESS,
  REMOVETOCARD,
} from "./actionType";

export const productRequestAction = () => {
  return {
    type: PRODUCTREQUEST,
  };
};
export const productSuccessAction = (data) => {
  return {
    type: PRODUCTSUCCESS,
    payload: data,
  };
};
export const productFailedAction = (error) => {
  return {
    type: PRODUCTFAILED,
    payload: error,
  };
};
export const addToCardAction = (product) => {
  return {
    type: ADDTOCARD,
    payload: product,
  };
};
export const removeToCardAction = (product) => {
  return {
    type: REMOVETOCARD,
    payload: product,
  };
};
