export const LOCAl_STORAGE_KEYS = {
  USER: "user",
  FAVORITES: "favorites",
};

function setLocalStorage(key, value) {
  const stringifyValue = JSON.stringify(value);
  localStorage.setItem(key, stringifyValue);
}

function getLocalStorage(key) {
  const value = localStorage.getItem(key);
  return JSON.parse(value);
}

function clearLocalStorage(key) {
  localStorage.removeItem(key);
}

export default {
  get(key) {
    return getLocalStorage(key);
  },
  set(key, value) {
    return setLocalStorage(key, value);
  },
  clear(key) {
    return clearLocalStorage(key);
  },
};
