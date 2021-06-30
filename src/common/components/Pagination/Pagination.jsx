import React from 'react';
import cn from 'classnames';
import { range } from 'Utils/utils';

import styles from './Pagination.module.scss';

const Pagination = ({ total, limit, url, currentPage, onClick }) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);

  return (
    <div className={styles.container}>
      {pages.map((page, index) => {
        const offset = (index * limit).toString();
        let active;

        if (currentPage === undefined) {
          active = 1 === page;
        } else {
          active = parseInt(currentPage / limit) === page - 1;
        }

        return (
          <button
            key={index}
            className={cn(styles.item, {
              [styles.active]: active,
            })}
            onClick={() => onClick(`${url}?limit=${limit}&offset=${offset}`)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default React.memo(Pagination);
