import { instance } from 'configs/axios'
import { ResultWithData, ResultWithMessage, ChangePwInputValue } from 'types/settingType'
import { removeAccessToken, removeRefreshToken } from 'utils/localStorage'
import { ResetPwInputValue, FindPwInputValue } from 'types/authType'

export const userService = {
  async showMember(): Promise<ResultWithData | ResultWithMessage> {
    const response = await instance.get(`/api/member/single`)

    if (response.status === 200) {
      return {
        result: 'success',
        data: response.data.data,
      }
    } else {
      return {
        result: 'fail',
        message: '조회에 실패했습니다. 다시 시도해주세요.',
      }
    }
  },

  async updatePassword({
    password,
    newPassword,
    newPasswordConfirm,
  }: ChangePwInputValue): Promise<ResultWithMessage> {
    const response = await instance('/api/member/update/password', {
      method: 'PUT',
      data: {
        currentPassword: password,
        newPassword: newPassword,
        passwordConfirm: newPasswordConfirm,
      },
    })

    if (response.status === 200) {
      return {
        result: 'success',
        message: '비밀번호가 변경되었습니다.',
      }
    } else if (response.status === 404) {
      return {
        result: 'fail',
        message: '기존 비밀번호를 잘못 입력하였습니다. 다시 시도해주세요.',
      }
    } else {
      return {
        result: 'fail',
        message: '비밀번호 변경에 실패했습니다. 다시 시도해주세요.',
      }
    }
  },

  async updateNickname(nickname: string): Promise<ResultWithMessage> {
    const response = await instance('/api/member/update/nickname', {
      method: 'PUT',
      data: {
        nickname: nickname,
      },
    })

    if (response.status === 200) {
      return {
        result: 'success',
        message: '닉네임이 변경되었습니다.',
      }
    } else if (response.status === 400) {
      return {
        result: 'fail',
        message: response.data.data.validation.nickname || response.data.data.error,
      }
    } else {
      return {
        result: 'fail',
        message: '닉네임 변경에 실패했습니다. 다시 시도해주세요.',
      }
    }
  },

  async updateImage(profileImageUrl: string): Promise<ResultWithMessage> {
    const response = await instance('/api/member/update/image', {
      method: 'PUT',
      data: {
        profileImageUrl: profileImageUrl,
      },
    })

    if (response.status === 200) {
      return {
        result: 'success',
        message: '프로필 이미지가 변경되었습니다.',
      }
    } else {
      return {
        result: 'fail',
        message: '프로필 이미지 변경에 실패했습니다. 다시 시도해주세요.',
      }
    }
  },

  async myArticle(
    size: number,
    page: number,
  ): Promise<ResultWithData | ResultWithMessage> {
    const response = await instance('/api/member/article', {
      method: 'GET',
      params: {
        size,
        page,
      },
    })

    if (response.status === 200) {
      return {
        result: 'success',
        data: response.data.data,
      }
    } else {
      return {
        result: 'fail',
        message: '조회에 실패했습니다. 다시 시도해주세요.',
      }
    }
  },

  async MyComment(
    size: number,
    page: number,
  ): Promise<ResultWithData | ResultWithMessage> {
    const response = await instance('/api/member/comment', {
      method: 'GET',
      params: {
        size,
        page,
      },
    })

    if (response.status === 200) {
      return {
        result: 'success',
        data: response.data.data,
      }
    } else {
      return {
        result: 'fail',
        message: '조회에 실패했습니다. 다시 시도해주세요.',
      }
    }
  },

  async deleteMember(email: string): Promise<ResultWithMessage> {
    const response = await instance('/api/member/delete', {
      method: 'DELETE',
      headers: {
        EMAIL: email,
      },
    })

    if (response.status === 200) {
      removeAccessToken()
      removeRefreshToken()
      return {
        result: 'success',
        message: '회원정보가 삭제되었습니다.',
      }
    } else {
      return {
        result: 'fail',
        message: '조회에 실패했습니다. 다시 시도해주세요.',
      }
    }
  },

  async findPw({ email, name }: FindPwInputValue): Promise<ResultWithMessage> {
    const response = await instance('/api/auth/forgot/password', {
      method: 'POST',
      data: {
        email,
        name,
      },
    })
    console.log('response', response)
    if (response.status === 200) {
      return {
        result: 'success',
        message:
          '이메일로 비밀번호 변경 정보가 전송되었습니다. \n 메일함을 확인해주세요.',
      }
    } else {
      return {
        result: 'fail',
        message: '이메일 전송에 실패했습니다. 다시 시도해주세요.',
      }
    }
  },

  async resetPw({
    password,
    passwordConfirm,
    identifier,
  }: ResetPwInputValue): Promise<ResultWithMessage> {
    const response = await instance('api/auth/forgot/password/confirm', {
      method: 'POST',
      data: {
        password,
        passwordConfirm,
      },
      params: {
        identifier,
      },
    })
    console.log('response', response)
    if (response.status === 200) {
      return {
        result: 'success',
        message: '비밀번호 재설정이 완료되었습니다.',
      }
    } else {
      return {
        result: 'fail',
        message: '비밀번호 재설정에 실패했습니다. 다시 시도해주세요.',
      }
    }
  },
}
