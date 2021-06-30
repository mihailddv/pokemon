import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from './constants';

export default () => {
  const [isLoadingCount, setIsLoadingCount] = useState(false);
  const [responseCount, setResponseCount] = useState([]);
  const [errorCount, setErrorCount] = useState(null);

  const doFetchCount = useCallback(() => {
    setIsLoadingCount(true);
  }, []);

  useEffect(() => {
    if (!isLoadingCount) {
      return;
    }

    axios(`${BASE_URL}pokemon`)
      .then((res) => {
        setResponseCount(res.data.count);
        setIsLoadingCount(false);
      })
      .catch((error) => {
        setErrorCount(error.response.data);
        setIsLoadingCount(false);
      });
  }, [isLoadingCount]);

  return [{ isLoadingCount, responseCount, errorCount }, doFetchCount];
};
