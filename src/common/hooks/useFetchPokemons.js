import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from './constants';
import { initPokemons } from 'Actions/actions';

export default (url, count) => {
  const dispatch = useDispatch();
  const [isLoadingPokemons, setIsLoading] = useState(false);
  const [responsePokemons, setResponse] = useState(null);
  const [errorPokemons, setError] = useState(null);

  const doFetch = useCallback(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoadingPokemons) {
      return;
    }

    const link = count
      ? `${BASE_URL}pokemon?limit=${count}`
      : `${BASE_URL}pokemon/?${url}`;

    axios
      .get(link)
      .then((res) => {
        return res.data.results;
      })
      .then((results) => {
        return Promise.all(results.map((res) => axios.get(res.url)));
      })
      .then((results) => {
        setIsLoading(false);
        dispatch(initPokemons([results.map((res) => res.data)]));
      });
  }, [isLoadingPokemons]);

  return [{ isLoadingPokemons, responsePokemons, errorPokemons }, doFetch];
};
