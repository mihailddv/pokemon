import { CREATE_POKEMON, SET_LIMIT, FILTERED_POKEMON } from './types';

const initialState = {
  list: [],
  limit: 10,
  filteredPokemons: [],
};

export const pokemonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POKEMON:
      return { ...state, list: action.payload };
    case FILTERED_POKEMON:
      return { ...state, filteredPokemons: action.payload };
    case SET_LIMIT:
      return { ...state, limit: action.payload };
    default:
      return state;
  }
};
