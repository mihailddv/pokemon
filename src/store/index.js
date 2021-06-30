import { pokemonsReducer } from './pokemons-reducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  pokemons: pokemonsReducer,
});

export default allReducers;
