import axios, { AxiosResponse } from 'axios'
import { instance } from 'configs/axios'

interface AptVerifyParam {
  aptId: string
  aptName: string
}

interface AptExistsParam {
  aptId: string
}

interface CommunityCreateParam {
  aptId: string
  aptName: string
}

interface getAptNameParam {
  aptId: string
}

export const aptService = {
  async verifyApt(param: CommunityCreateParam) {
    const { aptId, aptName } = param
    try {
      await instance('/api/apartment/auth', {
        method: 'post',
        data: {
          code: aptId,
          name: aptName,
        },
      })
      return {
        statusCode: 201,
        message: `${aptName} 아파트 인증이 완료 되었습니다. 메인 화면으로 이동합니다.`,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error)
        return {
          statusCode: 500,
          message: '아파트 인증에 실패하였습니다. 다시 시도해주세요.',
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },

  async aptExists(param: AptExistsParam) {
    const { aptId } = param
    try {
      const response: AxiosResponse = await instance(`/api/apartment/${aptId}/exist`, {
        method: 'get',
        data: {
          aptId,
        },
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          statusCode: 500,
          message: '커뮤니티 조회에 실패 하였습니다. 다시 시도해주세요.',
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },

  async createCommunity(param: CommunityCreateParam) {
    const { aptId, aptName } = param
    try {
      await instance('/api/apartment/register', {
        method: 'post',
        data: {
          code: aptId,
          name: aptName,
        },
      })
      return {
        statusCode: 201,
        message: `${aptName}의 커뮤니티가 생성되었습니다. 커뮤니티로 이동합니다.`,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error)
        return {
          statusCode: 500,
          message: '커뮤니티 생성에 실패 하였습니다. 다시 시도해주세요.',
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },

  async getAptName(param: getAptNameParam) {
    const { aptId } = param
    try {
      const response: AxiosResponse = await instance(`/api/apartment/${aptId}`, {
        method: 'get',
        data: {
          aptId,
        },
      })
      return response.data.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          statusCode: 500,
          message: '아파트 이름 조회에 실패 하였습니다. 다시 시도해주세요.',
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },
}
