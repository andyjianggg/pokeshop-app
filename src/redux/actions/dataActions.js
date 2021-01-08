import {
  LOADING_DATA,
  SET_ERRORS,
  SET_POKEMON,
  CLEAR_ERRORS,
  LOADING_UI,
} from "../types";
import axios from "axios";

// Get all pokemon
export const getPokemon = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/pokemon")
    .then((res) => {
      dispatch({
        type: SET_POKEMON,
        payload: res.data,
      });
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
