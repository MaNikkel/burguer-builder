import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurguerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGUER_SUCCESS,
    payload: { id, orderData }
  };
};

export const purchaseBurguerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGUER_FAIL,
    payload: { error }
  };
};

export const purchaseBurguerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGUER_START
  };
};

export const purchaseBurguer = orderData => {
  return dispatch => {
    dispatch(purchaseBurguerStart());
    axios
      .post("/orders.json", orderData)
      .then(response => {
        dispatch(purchaseBurguerSuccess(response.data.name, orderData));
      })
      .catch(err => {
        dispatch(purchaseBurguerFail(err));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: { orders }
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    payload: { error }
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios
      .get("/orders.json")
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
