import { AxiosPromise } from 'axios'
import { ConfirmEmailTokenResult, ConfirmNicknameResult, InputValue } from 'types/auth'

export class AuthService {
  #httpClient
  #tokenRepository

  constructor(httpClient: any, tokenRepository: any) {
    this.#httpClient = httpClient
    this.#tokenRepository = tokenRepository
  }

  async sendEmailAuthCode(email: string) {
    console.log('히히')
    const test = await this.#httpClient.axiosInstance('/api/auth/email/send', {
      method: 'GET',
      params: { email: email },
    })
    console.log(test, test.data)
  }

  confirmEmailToken(email: string, token: string): AxiosPromise<ConfirmEmailTokenResult> {
    return this.#httpClient.axiosInstance('/api/auth/email/confirm', {
      method: 'GET',
      params: {
        email: email,
        token: token,
      },
    })
  }

  confirmNickname(nickname: string): AxiosPromise<ConfirmNicknameResult> {
    return this.#httpClient.axiosInstance('/api/auth/member/check', {
      method: 'GET',
      params: { nickname: nickname },
    })
  }

  signup(body: InputValue): AxiosPromise {
    return this.#httpClient.axiosInstance('/api/auth/join', {
      method: 'POST',
      body,
    })
  }

  signin(email: string, password: string): AxiosPromise {
    return this.#httpClient.axiosInstance('/api/auth/login', {
      method: 'POST',
      body: {
        email: email,
        password: password,
      },
    })
  }

  reissueToken(): AxiosPromise {
    return this.#httpClient.axiosInstance('/api/reissue/token', {
      method: 'POST',
    })
  }
}
