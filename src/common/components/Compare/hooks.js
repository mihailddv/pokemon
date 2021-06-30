import { useState } from 'react';
import { removeValueFromStorageKey } from 'Utils/utils';
import useFetchCompare from 'Hooks/useFetchCompare';

function useCompare() {
  const [sortedList, setSortedList] = useState([]);
  const [pokemonsList, setPokemonsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState();
  const storageCompareName = 'compare';
  const compareList = JSON.parse(localStorage.getItem(storageCompareName));
  const [{ response, error }, doFetch] = useFetchCompare(compareList);

  const handleSort = (list, value, index) => {
    let sorted;

    setActiveIndex(index);

    switch (value) {
      case 'hp':
        sorted = list.sort((a, b) => {
          return b.stats[0].base_stat - a.stats[0].base_stat;
        });
        break;
      case 'attack':
        sorted = list.sort((a, b) => {
          return b.stats[1].base_stat - a.stats[1].base_stat;
        });
        break;
      case 'defense':
        sorted = list.sort((a, b) => {
          return b.stats[2].base_stat - a.stats[2].base_stat;
        });
        break;
      case 'special attack':
        sorted = list.sort((a, b) => {
          return b.stats[3].base_stat - a.stats[3].base_stat;
        });
        break;
      case 'special defence':
        sorted = list.sort((a, b) => {
          return b.stats[4].base_stat - a.stats[4].base_stat;
        });
        break;
      case 'speed':
        sorted = list.sort((a, b) => {
          return b.stats[5].base_stat - a.stats[5].base_stat;
        });
        break;
      default:
        sorted = list.sort((a, b) => b[value] - a[value]);
    }
    setSortedList(sorted);
  };

  const handleDelete = (key, name, index) => {
    const data = pokemonsList;
    removeValueFromStorageKey(key, name);
    setPokemonsList([...data.slice(0, index), ...data.slice(index + 1)]);
  };

  return {
    handleSort,
    setSortedList,
    sortedList,
    handleDelete,
    setPokemonsList,
    pokemonsList,
    setIsLoading,
    isLoading,
    doFetch,
    error,
    response,
    storageCompareName,
    activeIndex,
  };
}

export default useCompare;
