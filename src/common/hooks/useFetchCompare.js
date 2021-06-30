import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from './constants';

export default (list) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);

  const doFetch = useCallback(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    list?.forEach((element) => {
      axios(`${BASE_URL}pokemon/${element}`)
        .then((res) => {
          setResponse((prevArray) => [...prevArray, res.data]);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.response.data);
          setIsLoading(false);
        });
    });
  }, [isLoading]);

  return [{ isLoading, response, error }, doFetch];
};
