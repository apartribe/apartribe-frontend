import { AxiosPromise, AxiosResponse } from 'axios'
import {
  ConfirmEmailTokenResult,
  ConfirmNicknameResult,
  SignupInputValue,
} from 'types/auth'

export class AuthService {
  #httpClient
  #webStorage

  constructor(httpClient: any, webStorage: any) {
    this.#httpClient = httpClient
    this.#webStorage = webStorage
  }

  sendEmail(email: string) {
    this.#httpClient.axiosInstance('/api/auth/email/send', {
      method: 'GET',
      params: { email: email },
    })
  }

  confirmEmail(
    email: string,
    token: string,
  ) /* : AxiosPromise<ConfirmEmailTokenResult> */ {
    this.#httpClient
      .axiosInstance('/api/auth/email/confirm', {
        method: 'GET',
        params: {
          email: email,
          token: token,
        },
      })
      .then((response: AxiosResponse) => console.log('==confirmEmail==', response))
  }

  checkNickname(nickname: string) /* : AxiosPromise<ConfirmNicknameResult> */ {
    this.#httpClient
      .axiosInstance('/api/auth/member/check', {
        method: 'GET',
        params: { nickname: nickname },
      })
      .then((response: AxiosResponse) => console.log('==checkNickname==', response))
  }

  signup(body: SignupInputValue) /* : AxiosPromise */ {
    console.log(body)
    this.#httpClient
      .axiosInstance('/api/auth/join', {
        method: 'POST',
        data: body,
      })
      .then((response: AxiosResponse) => console.log('==signup==', response))
  }

  signin(email: string, password: string) /* : AxiosPromise  */ {
    this.#httpClient
      .axiosInstance('/api/auth/login', {
        method: 'POST',
        data: {
          email: email,
          password: password,
        },
      })
      .then((response: AxiosResponse) => {
        console.log('==signin response.headers==', response.headers)
        console.log('AccessToken: ', response.headers['authorization'].substring(7))
        console.log('document.cookie: ', document.cookie)
        this.#webStorage.set(response.headers['authorization'].substring(7))
      })
  }

  logout() {
    this.#webStorage.remove()
    //TODO: 로그아웃할때 쿠키도 삭제해주기
  }

  /* 
    HttpClient에서 AuthService를 부르는게 이상해서 일단 이 reissueToken()을 호출안하고 
    this.axiosInstance('/api/reissue/token', {
      method: 'POST'
    }) 
    이렇게 바로 불러다가 쓰게했는데 이게맞나...
  */
  reissueToken() /* : AxiosPromise */ {
    this.#httpClient.axiosInstance('/api/reissue/token', {
      method: 'POST',
    })
  }
}
