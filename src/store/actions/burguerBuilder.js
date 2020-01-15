import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

// action creator para adicionar o ingrediente
export const addIngredient = ({ payload }) => {
  console.log(payload);
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: payload
  };
};

export const removeIngredient = ({ payload }) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: payload
  };
};

// * ASYNC PART

// action síncrona chamada pela action assíncrona pelo dispatch
export const setIngredients = ({ payload }) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: payload
  };
};

// action em caso de erro
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  // retornar o dispatch é possível (mas não obrigatório) graças ao redux thunk
  return dispatch => {
    // aqui fica o código assíncrono
    axios
      .get("https://react-my-burger-4094a.firebaseio.com/ingredients.json")
      .then(response => {
        dispatch(setIngredients({ payload: { ingredients: response.data } }));
      })
      .catch(err => dispatch(fetchIngredientsFailed()));
  };
};
