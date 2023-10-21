import axios from 'axios'
import { instance } from 'configs/axios'
import { ResultWithData, ResultWithMessage, ChangePwInputValue } from 'types/setting'

export const user = {
  async showMember(email: string): Promise<ResultWithData | ResultWithMessage> {
    try {
      const response = await instance.get(`/api/member/${email}`)
      return {
        result: 'success',
        data: response.data.data,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          result: 'fail',
          message: '조회에 실패했습니다. 다시 시도해주세요.',
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },

  async updatePassword(body: ChangePwInputValue): Promise<ResultWithMessage> {
    const { password, newPassword, newPasswordConfirm } = body
    try {
      await instance('/api/member/update/password', {
        method: 'PUT',
        data: {
          currentPassword: password,
          newPassword: newPassword,
          passwordConfirm: newPasswordConfirm,
        },
      })
      return {
        result: 'success',
        message: '비밀번호가 변경되었습니다.',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          result: 'fail',
          message: '비밀번호 변경에 실패했습니다. 다시 시도해주세요.',
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },

  async updateNickname(nickname: string): Promise<ResultWithMessage> {
    try {
      await instance('/api/member/update/nickname', {
        method: 'PUT',
        data: {
          nickname: nickname,
        },
      })
      return {
        result: 'success',
        message: '닉네임이 변경되었습니다.',
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          return {
            result: 'fail',
            message:
              error.response?.data.data.validation.nickname ||
              error.response?.data.data.error,
          }
        } else {
          return {
            result: 'fail',
            message: '닉네임 변경에 실패했습니다. 다시 시도해주세요.',
          }
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },
}
