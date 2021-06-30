import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from './constants';

export default (searchValue) => {
  const [isLoadingSearch, setIsLoading] = useState(false);
  const [responseSearch, setResponse] = useState([]);
  const [errorSearch, setError] = useState(null);

  const doFetchSearch = useCallback(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoadingSearch) {
      return;
    }

    axios
      .get(`${BASE_URL}pokemon?limit=9999`)
      .then((res) => {
        return res.data.results;
      })
      .then((results) => {
        return Promise.all(results.map((res) => axios.get(res.url)));
      })
      .then((results) => {
        const search = searchValue?.trim().toLowerCase();
        let array = results.map((res) => res.data);

        array = array.filter(function (item) {
          if (item.name?.toLowerCase().indexOf(search) !== -1) {
            return item;
          }
        });

        if (array.length === 0) {
          setResponse(null);
        } else {
          setResponse(array);
        }
        setIsLoading(false);
      });
  }, [isLoadingSearch]);

  return [{ isLoadingSearch, responseSearch, errorSearch }, doFetchSearch];
};
