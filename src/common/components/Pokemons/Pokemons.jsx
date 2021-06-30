import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Pokemons.module.scss';

const Pokemons = ({ list }) => {
  return (
    <div className={styles.container}>
      {Object.values(list).map((pokemon) => {
        const { name, sprites } = pokemon;

        return (
          <Link className={styles.pokemon} key={name} to={`/pokemon/${name}`}>
            <div className={styles.pokemonImg}>
              <img src={sprites?.front_default} />
            </div>
            <div className={styles.pokemonTitle}>{name}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default React.memo(Pokemons);
