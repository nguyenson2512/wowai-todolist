class LocalStorageService {
  prefix = "app";

  constructor() {
    this.localStorage = window.localStorage;
  }

  set(key, data) {
    this.localStorage.setItem(this.generateKey(key), data);
  }

  get(key) {
    return this.localStorage.getItem(this.generateKey(key));
  }

  unset(key) {
    this.localStorage.removeItem(this.generateKey(key));
  }

  generateKey(key) {
    return this.prefix + "_" + key;
  }
}

export const localStorageService = new LocalStorageService();
