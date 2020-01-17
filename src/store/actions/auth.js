import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (localId, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: { authData: { localId: localId, idToken: token } }
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: { error }
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjVG_4tWGhHM87y0cB4UfUq3Boe1SLOVI";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjVG_4tWGhHM87y0cB4UfUq3Boe1SLOVI";
    }
    axios
      .post(url, authData)
      .then(response => {
        console.log(response);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(response.data.localId, response.data.idToken));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate < new Date()) {
        console.log("here");
        dispatch(logout());
        //dispatch(authSuccess());
      } else {
        axios
          .post(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDjVG_4tWGhHM87y0cB4UfUq3Boe1SLOVI",
            { idToken: token }
          )
          .then(response => {
            console.log(response.data.users[0].localId);
            dispatch(authSuccess(response.data.users[0].localId, token));
            // dispatch(
            //   checkAuthTimeout(
            //     expirationDate.getSeconds() - new Date().getSeconds()
            //   )
            // );
          });
      }
    }
  };
};
