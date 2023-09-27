import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

export class HttpClient {
  #baseURL
  #webStorage

  #onRequest(config: AxiosRequestConfig) {
    console.log('---request interceptor (config)---', config)
    return config
  }

  #onErrorRequest(error: AxiosError<AxiosRequestConfig>) {
    console.log('---request interceptor (error)---', error)
    return Promise.reject(error)
  }

  #onResponse(response: AxiosResponse) {
    console.log('---response interceptor (response)---', response)
    return response
  }

  #onErrorResponse(error: AxiosError | Error) {
    console.log('---response interceptor (error)---', error)

    if (axios.isAxiosError(error)) {
      const originalConfig = error.config as AxiosRequestConfig
      console.log('originalConfig', originalConfig)

      if (error.response?.status === 401) {
        //서버에서 보낸 쿠키값이 브라우저에 안담기는데 도대체 어떻게 쿠키값을 서버로 보냄??????
        this.axiosInstance('/api/reissue/token', {
          method: 'POST',
        }).then((response: AxiosResponse) => {
          this.#webStorage.set(response.headers['authorization'].substring(7))

          return originalConfig
        })
      }
    }

    return Promise.reject(error)
  }

  constructor(baseURL: string | undefined, webStorage: any) {
    this.#baseURL = baseURL
    this.#webStorage = webStorage
  }

  axiosInstance(endPoint: string, options: any = {}) {
    //axios.interceptors.request.use(this.#onRequest, this.#onErrorRequest)
    axios.interceptors.response.use(this.#onResponse, this.#onErrorResponse)

    return axios({
      url: this.#baseURL + endPoint,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.#webStorage.get()}`,
        ...options.headers,
      },
      withCredentials: true,
      ...options,
    })
  }
}
