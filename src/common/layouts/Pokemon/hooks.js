import { useState, useEffect } from 'react';
import { removeValueFromStorageKey } from 'Utils/utils';

import useFetch from 'Hooks/useFetch';
import useFetchPokemonAbility from 'Hooks/useFetchPokemonAbility';

function usePokemon(slug) {
  const storageCompareName = 'compare';
  const compareList = JSON.parse(localStorage.getItem(storageCompareName));
  const apiUrl = `pokemon/${slug}`;
  const [currentAbility, setCurrentAbility] = useState();
  const [urlAbility, setUrlAbility] = useState();
  const [isAddedToCompare, setIsAddedToCompare] = useState(false);

  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
  const [{ responseAbility, isLoadingAbility }, doFetchAbility] =
    useFetchPokemonAbility(urlAbility);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  const onToggleOpen = (url) => {
    setCurrentAbility('');
    setUrlAbility(url);
    doFetchAbility();
    setCurrentAbility(responseAbility);
  };

  const handleCompare = (name) => {
    if (!isAddedToCompare) {
      if (compareList) {
        compareList.push(name);
        localStorage.setItem(storageCompareName, JSON.stringify(compareList));
      } else {
        localStorage.setItem(storageCompareName, JSON.stringify([name]));
      }
      setIsAddedToCompare(true);
    } else {
      removeValueFromStorageKey(storageCompareName, response?.name);
      setIsAddedToCompare(false);
    }
  };

  useEffect(() => {
    setCurrentAbility(responseAbility);
  }, [setCurrentAbility, responseAbility]);

  useEffect(() => {
    const findPokemon = compareList?.find((item) => item === response?.name);
    if (findPokemon) {
      setIsAddedToCompare(true);
    }
  });

  return {
    isLoading,
    response,
    error,
    onToggleOpen,
    currentAbility,
    responseAbility,
    isLoadingAbility,
    handleCompare,
    isAddedToCompare,
  };
}

export default usePokemon;
