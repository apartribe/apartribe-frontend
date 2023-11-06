import { instance } from 'configs/axios'
import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from 'utils/localStorage'
import { ResultWithMessage, SignupInputValue } from 'types/authType'

export const authService = {
  async sendEmail(email: string): Promise<ResultWithMessage> {
    const response = await instance('/api/auth/email/send', {
      method: 'GET',
      params: { email: email },
    })

    if (response.status === 200) {
      return {
        result: 'success',
        message: '이메일이 발송되었습니다. 메일함을 확인해주세요.',
      }
    } else {
      return {
        result: 'fail',
        message: '이메일 발송에 실패하였습니다. 다시 시도해주세요.',
      }
    }
  },

  async confirmEmail(email: string, token: string): Promise<ResultWithMessage> {
    const response = await instance('/api/auth/email/confirm', {
      method: 'GET',
      params: {
        email: email,
        token: token,
      },
    })

    if (response.status === 200) {
      if (response.data.isEmailTokenValid) {
        return {
          result: 'success',
          message: '인증이 완료되었습니다.',
        }
      } else {
        return {
          result: 'fail',
          message: '인증번호가 일치하지 않습니다.',
        }
      }
    } else {
      return {
        result: 'fail',
        message: '인증번호 확인에 실패하였습니다. 다시 시도해주세요.',
      }
    }
  },

  async checkNickname(nickname: string): Promise<ResultWithMessage> {
    const response = await instance('/api/auth/member/check', {
      method: 'GET',
      params: { nickname: nickname },
    })

    if (response.status === 200) {
      if (response.data.isNicknameValid) {
        return {
          result: 'success',
          message: '사용가능한 닉네임 입니다.',
        }
      } else {
        return {
          result: 'fail',
          message: '이미 사용중인 닉네임 입니다.',
        }
      }
    } else {
      return {
        result: 'fail',
        message: '닉네임 확인에 실패하였습니다.',
      }
    }
  },

  async signup(body: SignupInputValue): Promise<ResultWithMessage> {
    const response = await instance('/api/auth/join', {
      method: 'POST',
      data: body,
    })

    if (response.status === 201) {
      return {
        result: 'success',
        message: '회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.',
      }
    } else {
      //400번. 이 메세지모달이랑 토스트메세지랑 같이뜸
      return {
        result: 'fail',
        message: '회원가입에 실패하였습니다. 다시 시도해주세요.',
      }
    }
  },

  async signin(email: string, password: string): Promise<ResultWithMessage> {
    const response = await instance('/api/auth/login', {
      method: 'POST',
      data: {
        email: email,
        password: password,
      },
    })

    if (response.status === 200) {
      setAccessToken(response.data.accessToken)
      setRefreshToken(response.data.refreshToken)
      return {
        result: 'success',
        message: '로그인이 완료되었습니다.',
      }
    } else if (response.status === 401) {
      return {
        result: 'fail',
        message: '아이디 또는 비밀번호를 다시 확인해주세요.',
      }
    } else {
      return {
        result: 'fail',
        message: '로그인에 실패하였습니다. 다시 시도해주세요.',
      }
    }
  },

  logout() {
    removeAccessToken()
    removeRefreshToken()
  },

  async reissueToken() {
    const response = await instance('/api/reissue/token', {
      method: 'POST',
      data: {
        refreshToken: getRefreshToken(),
      },
    })
    setAccessToken(response.data.accessToken)
    setRefreshToken(response.data.refreshToken)
  },
}
