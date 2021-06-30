import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginator, debounce } from 'Utils/utils';
import { stringify } from 'query-string';
import { useHistory } from 'react-router-dom';

import useFetchSearch from 'Hooks/useFetchSearch';
import useFetchPokemons from 'Hooks/useFetchPokemons';
import useFetchCount from 'Hooks/useFetchCount';
import { initPokemons, setLimit } from 'Actions/actions';

function usePokemons() {
  const dispatch = useDispatch();
  const history = useHistory();
  const limit = useSelector((state) => state.pokemons.limit);
  const pokemons = useSelector((state) => state.pokemons.list[0]);
  const { offset, currentPage } = getPaginator(location.search);
  const stringifiedParams = stringify({
    limit,
    offset,
  });

  const [count, setCount] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [resultText, setResultText] = useState();
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const [{ isLoadingSearch, responseSearch }, doFetchSearch] =
    useFetchSearch(searchValue);
  const [{ isLoadingPokemons, errorPokemons }, doFetchPokemons] =
    useFetchPokemons(stringifiedParams);
  const [{ isLoadingCount, responseCount }, doFetchCount] = useFetchCount();

  const startSearch = debounce(() => {
    setResultText('Loading');
    doFetchSearch();
  }, 300);

  const handlePagination = (link) => {
    history.push(link);
  };

  const fetchDataLimit = (count) => {
    doFetchPokemons(null, count);
  };

  const onChangeLimit = (count) => {
    history.push('/');
    dispatch(initPokemons([]));
    dispatch(setLimit(count));
    fetchDataLimit(count);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const textLength = event.target.value.length;

    setSearchValue(event.target.value);
    setFilteredPokemons([]);

    if (textLength === 0) {
      setResultText('');
    }

    if (textLength > 0 && textLength <= 3) {
      setResultText('4 characters minimum');
    }

    if (textLength > 3) {
      startSearch();
      if (responseSearch) {
        setFilteredPokemons(responseSearch);
      } else {
        setFilteredPokemons([]);
      }
    }
  };

  useEffect(() => {
    doFetchPokemons(stringifiedParams);
    getPaginator();
    doFetchCount();
    setCount(responseCount);
  }, [currentPage, responseCount, setCount]);

  useEffect(() => {
    setFilteredPokemons([]);
    if (responseSearch) {
      setFilteredPokemons(responseSearch);
      setResultText(null);
    } else {
      setResultText('no results');
    }
  }, [responseSearch]);

  return {
    startSearch,
    handlePagination,
    responseSearch,
    isLoadingSearch,
    setSearchValue,
    resultText,
    setResultText,
    errorPokemons,
    isLoadingPokemons,
    doFetchPokemons,
    fetchDataLimit,
    onChangeLimit,
    doFetchCount,
    responseCount,
    isLoadingCount,
    setCount,
    count,
    handleSearchSubmit,
    setFilteredPokemons,
    filteredPokemons,
    currentPage,
    limit,
    pokemons,
  };
}

export default usePokemons;
