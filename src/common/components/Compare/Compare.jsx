import React, { useEffect } from 'react';
import cn from 'classnames';
import Container from 'UI/Container';
import Page from 'UI/Page';
import Cross from 'UI/Icons/Cross';
import SortArrow from 'UI/Icons/SortArrow';
import Loader from 'Components/Loader';
import Error from 'Components/Error';
import { tableData } from './constants';
import useCompare from './hooks';

import styles from './Compare.module.scss';

const Compare = () => {
  const hook = useCompare();

  useEffect(() => {
    hook.doFetch();
    hook.setPokemonsList(hook.response);
    hook.setIsLoading(false);
  }, [hook.response]);

  useEffect(() => {
    hook.setPokemonsList([...hook.sortedList]);
  }, [hook.sortedList]);

  return (
    <Container>
      <Page>
        {hook.error && <Error />}
        {hook.isLoading ? (
          <Loader />
        ) : (
          <div className={styles.container}>
            {hook.pokemonsList.length ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>picture</th>
                    {tableData.map((item, index) => {
                      const { value } = item;
                      return (
                        <th key={index}>
                          <button
                            className={cn(styles.sortBtn, {
                              [styles.sortBtnActive]:
                                hook.activeIndex === index,
                            })}
                            onClick={() =>
                              hook.handleSort(hook.pokemonsList, value, index)
                            }
                          >
                            <span className={styles.sortText}>{value}</span>
                            <div className={styles.sortIcon}>
                              <SortArrow />
                            </div>
                          </button>
                        </th>
                      );
                    })}
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {hook.pokemonsList.map((item, index) => {
                    const { name, height, weight, sprites, stats } = item;
                    return (
                      <tr key={index}>
                        <td>{name}</td>
                        <td>
                          <div className={styles.itemImage}>
                            <img src={sprites?.front_default} />
                          </div>
                        </td>
                        <td>{height}</td>
                        <td>{weight}</td>
                        <td>{stats[0]?.base_stat}</td>
                        <td>{stats[1]?.base_stat}</td>
                        <td>{stats[2]?.base_stat}</td>
                        <td>{stats[3]?.base_stat}</td>
                        <td>{stats[4]?.base_stat}</td>
                        <td>{stats[5]?.base_stat}</td>
                        <td>
                          <button
                            className={styles.btnDelete}
                            onClick={() =>
                              hook.handleDelete(
                                hook.storageCompareName,
                                item.name,
                                index
                              )
                            }
                          >
                            <Cross />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div>No items to compare</div>
            )}
          </div>
        )}
      </Page>
    </Container>
  );
};

export default React.memo(Compare);
