import * as actionsTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      };
    case actionsTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload.orders,
        loading: false
      };
    case actionsTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };
    case actionsTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    case actionsTypes.PURCHASE_BURGUER_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: [
          ...state.orders,
          { id: action.payload.id, ...action.payload.orderData }
        ]
      };
    case actionsTypes.PURCHASE_BURGUER_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionsTypes.PURCHASE_BURGUER_START:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default reducer;
