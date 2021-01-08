import { LOADING_DATA, SET_POKEMON } from "../types";

const initialState = {
  pokemon: [],
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
    default:
      return state;
  }
}
