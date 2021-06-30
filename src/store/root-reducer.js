import { combineReducers } from 'redux';
import { pokemonsReducer } from './products-reducer';

export const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
});
