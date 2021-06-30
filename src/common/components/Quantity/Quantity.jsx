import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import buttons from './constants';
import styles from './Quantity.module.scss';

const Quantity = ({ onClick }) => {
  const limit = useSelector((state) => state.pokemons.limit);

  return (
    <div className={styles.container}>
      <span>Quantity per page</span>
      {Object.values(buttons).map((item, id) => {
        const { count } = item;
        const active = count === limit;

        return (
          <button
            className={cn(styles.item, {
              [styles.active]: active,
            })}
            key={id}
            onClick={() => onClick(count)}
          >
            <span className={styles.text}>{count}</span>
          </button>
        );
      })}
    </div>
  );
};

export default React.memo(Quantity);
