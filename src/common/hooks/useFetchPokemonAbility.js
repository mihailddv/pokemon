import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default (url) => {
  const [isLoadingAbility, setIsLoadingAbility] = useState(false);
  const [responseAbility, setResponseAbility] = useState(null);
  const [errorAbility, setErrorAbility] = useState(null);

  const doFetchAbility = useCallback((options = {}) => {
    setIsLoadingAbility(true);
  }, []);

  useEffect(() => {
    if (!isLoadingAbility) {
      return;
    }

    axios(`${url}`)
      .then((res) => {
        setResponseAbility(res.data.effect_entries[1].effect);
        setIsLoadingAbility(false);
      })
      .catch((error) => {
        setErrorAbility(error.response.data);
        setIsLoadingAbility(false);
      });
  }, [isLoadingAbility]);

  return [{ isLoadingAbility, responseAbility, errorAbility }, doFetchAbility];
};
