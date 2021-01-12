import {
  LOADING_DATA,
  SET_ERRORS,
  SET_POKEMON,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_CART,
} from "../types";
import axios from "axios";

// Get all pokemon
export const getPokemon = (authenticated) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/pokemon")
    .then((res) => {
      dispatch({
        type: SET_POKEMON,
        payload: res.data,
      });
      if (authenticated) {
        dispatch({ type: LOADING_DATA });
        axios
          .get("/user/cart")
          .then((res) => {
            dispatch({
              type: SET_CART,
              payload: res.data,
            });
            dispatch({ type: CLEAR_ERRORS });
          })
          .catch((error) => {
            dispatch({
              type: SET_ERRORS,
              payload: error.response.data,
            });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: SET_POKEMON,
        payload: [],
      });
    });
};

// Add a pokemon
export const addOnePokemon = (pokemonData, formData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/pokemon", pokemonData)
    .then((res) => {
      axios
        .post(`/pokemon/${res.data.pokemonId}/image`, formData)
        .then(() => {
          dispatch({ type: CLEAR_ERRORS });
          history.push("/");
        })
        .catch((error) => {
          dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
          });
        });
    })
    .catch((error) => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      });
    });
};

// Add a pokemon to cart
export const handleCart = (pokemonId, cartAction) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post(`/pokemon/${pokemonId}/${cartAction}`)
    .then(() => {
      axios
        .get("/user/cart")
        .then((res) => {
          dispatch({
            type: SET_CART,
            payload: res.data,
          });
          dispatch({ type: CLEAR_ERRORS });
        })
        .catch((error) => {
          dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
          });
        });
    })
    .catch((error) => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      });
    });
};

export const removeFromCart = (pokemonId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post(`/pokemon/${pokemonId}/removeCart`)
    .then(() => {
      axios
        .get("/user/cart")
        .then((res) => {
          dispatch({
            type: SET_CART,
            payload: res.data,
          });
          dispatch({ type: CLEAR_ERRORS });
        })
        .catch((error) => {
          dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
          });
        });
    })
    .catch((error) => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      });
    });
};

const getCart = () => (dispatch) => {
  axios
    .get("/user/cart")
    .then((res) => {
      dispatch({
        type: SET_CART,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((error) => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      });
    });
};

export const checkout = () => (dispatch) => {
  axios
    .post("/user/checkout")
    .then(() => {
      getPokemon(true);
    })
    .catch((error) => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      });
    });
};
