function get(key) {
  let value = null;
  if (localStorage !== undefined) {
    value = localStorage.getItem(key);
  }

  return value;
}

function set(key, value) {
  localStorage.setItem(key, value);
}

function remove(key) {
  if (localStorage !== undefined) {
    localStorage.removeItem(key);
  }
}

const localStorageModule = {
  get,
  set,
  remove
};

export default localStorageModule;
