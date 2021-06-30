import { CREATE_POKEMON, SET_LIMIT, FILTERED_POKEMON } from './types';

export function initPokemons(pokemon) {
  return {
    type: CREATE_POKEMON,
    payload: pokemon,
  };
}

export function filteredPokemons(pokemon) {
  return {
    type: FILTERED_POKEMON,
    payload: pokemon,
  };
}

export function setLimit(limit) {
  return {
    type: SET_LIMIT,
    payload: limit,
  };
}
