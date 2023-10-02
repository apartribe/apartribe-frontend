export class LocalStorage {
  #TOKEN_KEY

  constructor() {
    this.#TOKEN_KEY = 'ACCESS_TOKEN'
  }

  set(token: string) {
    localStorage.setItem(this.#TOKEN_KEY, token)
  }

  get() {
    return localStorage.getItem(this.#TOKEN_KEY)
  }

  remove() {
    localStorage.removeItem(this.#TOKEN_KEY)
  }
}
