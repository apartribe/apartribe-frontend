import axios, { AxiosResponse } from 'axios'
import { instance } from 'configs/axios'
import {
  SendEmailResult,
  ConfirmEmailResult,
  CheckNicknameResult,
  SignupInputValue,
  SignupResult,
  SigninResult,
} from 'types/auth'
import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from 'utils/localStorage'

export const authService = {
  async sendEmail(email: string): Promise<SendEmailResult> {
    try {
      await instance('/api/auth/email/send', {
        method: 'GET',
        params: { email: email },
      })
      return {
        result: 'success',
        message: '이메일이 발송되었습니다. 메일함을 확인해주세요.',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          result: 'fail',
          message: '이메일 발송에 실패하였습니다. 다시 시도해주세요.',
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },

  async confirmEmail(email: string, token: string): Promise<ConfirmEmailResult> {
    try {
      const response: AxiosResponse = await instance('/api/auth/email/confirm', {
        method: 'GET',
        params: {
          email: email,
          token: token,
        },
      })
      if (response.data.isEmailTokenValid) {
        return { result: 'success', message: '인증이 완료되었습니다.' }
      } else {
        return { result: 'fail', message: '인증번호가 일치하지 않습니다.' }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          result: 'fail',
          message: '인증번호 확인에 실패하였습니다. 다시 시도해주세요.',
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },

  async checkNickname(nickname: string): Promise<CheckNicknameResult> {
    try {
      const response: AxiosResponse = await instance('/api/auth/member/check', {
        method: 'GET',
        params: { nickname: nickname },
      })
      if (response.data.isNicknameValid) {
        return { result: 'success', message: '사용가능한 닉네임 입니다.' }
      } else {
        return { result: 'fail', message: '이미 사용중인 닉네임 입니다.' }
      }
    } catch (error) {
      return { result: 'fail', message: '닉네임 확인에 실패하였습니다.' }
    }
  },

  async signup(body: SignupInputValue): Promise<SignupResult> {
    try {
      await instance('/api/auth/join', {
        method: 'POST',
        data: body,
      })
      return {
        result: 'success',
        message: '회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          result: 'fail',
          message: '회원가입에 실패하였습니다. 다시 시도해주세요.',
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },

  async signin(email: string, password: string): Promise<SigninResult> {
    try {
      const response: AxiosResponse = await instance('/api/auth/login', {
        method: 'POST',
        data: {
          email: email,
          password: password,
        },
      })
      setAccessToken(response.data.accessToken)
      setRefreshToken(response.data.refreshToken)
      return { result: 'success', message: '로그인이 완료되었습니다.' }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          return { result: 'fail', message: '아이디 또는 비밀번호를 다시 확인해주세요.' }
        } else {
          return {
            result: 'fail',
            message: '로그인에 실패하였습니다. 다시 시도해주세요.',
          }
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },

  logout() {
    removeAccessToken()
    removeRefreshToken()
  },

  async reissueToken() {
    try {
      const response: AxiosResponse = await instance('/api/reissue/token', {
        method: 'POST',
        data: {
          refreshToken: getRefreshToken(),
        },
      })
      setAccessToken(response.data.accessToken)
      setRefreshToken(response.data.refreshToken)
      return { statusCode: 200, message: '토큰 갱신이 완료되었습니다.' }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { statusCode: 500, message: '토큰 갱신에 실패하였습니다.' }
      } else {
        return { statusCode: 401, message: '토큰 갱신에 실패하였습니다.' }
        // throw new Error('different error than axios')
      }
    }
  },
}
