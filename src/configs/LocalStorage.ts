export class LocalStorage {
  #ACCESS_TOKEN_KEY
  #REFRESH_TOKEN_KEY

  constructor() {
    this.#ACCESS_TOKEN_KEY = 'ACCESS_TOKEN'
    this.#REFRESH_TOKEN_KEY = 'REFRESH_TOKEN'
  }

  setAccessToken(token: string) {
    localStorage.setItem(this.#ACCESS_TOKEN_KEY, token)
  }

  getAccessToken() {
    return localStorage.getItem(this.#ACCESS_TOKEN_KEY)
  }

  removeAccessToken() {
    localStorage.removeItem(this.#ACCESS_TOKEN_KEY)
  }

  // ===========================================================

  setRefreshToken(token: string) {
    localStorage.setItem(this.#REFRESH_TOKEN_KEY, token)
  }

  getRefreshToken() {
    return localStorage.getItem(this.#REFRESH_TOKEN_KEY)
  }

  removeRefreshToken() {
    localStorage.removeItem(this.#REFRESH_TOKEN_KEY)
  }
}

// ================
// export class LocalStorage {
//   #TOKEN_KEY

//   constructor() {
//     this.#TOKEN_KEY = 'ACCESS_TOKEN'
//   }

//   set(token: string) {
//     localStorage.setItem(this.#TOKEN_KEY, token)
//   }

//   get() {
//     return localStorage.getItem(this.#TOKEN_KEY)
//   }

//   remove() {
//     localStorage.removeItem(this.#TOKEN_KEY)
//   }
// }
