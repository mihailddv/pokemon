import { parse } from 'query-string';

export const range = (start, end) => {
  return [...Array(end).keys()].map((el) => el + start);
};

export const getPaginator = (search) => {
  const parsedSearch = parse(search);
  const currentPage = parsedSearch.offset;
  // const offset = currentPage * limit - limit;
  const offset = currentPage;
  return { currentPage, offset };
};

export const removeValueFromStorageKey = (key, value) => {
  const storageKey = JSON.parse(localStorage.getItem(key));

  if (storageKey) {
    const filtered = storageKey.filter((item) => item !== value);
    localStorage.setItem(key, JSON.stringify(filtered));
  }
};

export const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
