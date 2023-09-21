import axios from 'axios'

export class HttpClient {
  #baseURL
  #tokenRepository

  constructor(baseURL: string | undefined, tokenRepository: any) {
    this.#baseURL = baseURL
    this.#tokenRepository = tokenRepository
  }

  axiosInstance(endPoint: string, options: any = {}) {
    return axios({
      url: this.#baseURL + endPoint,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.#tokenRepository.get()}`,
        ...options.headers,
      },
      ...options,
    })
  }
}
