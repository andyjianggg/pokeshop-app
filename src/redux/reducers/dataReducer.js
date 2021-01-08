import { LOADING_DATA, SET_POKEMON, SET_CART } from "../types";

const initialState = {
  pokemon: [],
  cart: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_POKEMON:
      return {
        ...state,
        loading: false,
        pokemon: action.payload,
      };
    case SET_CART:
      return {
        ...state,
        loading: false,
        cart: action.payload,
      };
    default:
      return state;
  }
}
