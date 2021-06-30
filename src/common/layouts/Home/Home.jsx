import React from 'react';
import Container from 'UI/Container';
import Quantity from 'Components/Quantity';
import Pagination from 'Components/Pagination';
import Pokemons from 'Components/Pokemons';
import Search from 'Components/Search';
import Loader from 'Components/Loader';
import Error from 'Components/Error';

import usePokemons from './hooks';

import styles from './Home.module.scss';

const Home = ({ match }) => {
  const url = match.url;
  const hook = usePokemons();

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <Search value={hook.searchValue} onChange={hook.handleSearchSubmit} />
          {!hook.filteredPokemons?.length && (
            <Quantity onClick={hook.onChangeLimit} />
          )}
        </div>
        {hook.isLoadingPokemons && <Loader />}
        {hook.errorPokemons && <Error />}
        {hook.resultText?.length > 0 && <div>{hook.resultText}</div>}
        {!hook.isLoadingPokemons && !hook.isLoadingSearch && (
          <>
            {hook.filteredPokemons?.length ? (
              <Pokemons list={hook.filteredPokemons} />
            ) : (
              <>
                {hook.pokemons && <Pokemons list={hook.pokemons} />}
                {hook.isLoadingCount && (
                  <Pagination
                    total={hook.count}
                    limit={hook.limit}
                    url={url}
                    currentPage={hook.currentPage}
                    onClick={hook.handlePagination}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default React.memo(Home);
