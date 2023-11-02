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
  async verifyApt(param: AptVerifyParam) {
    const { aptId, aptName } = param
    try {
      const response = await instance('/api/apartment/auth', {
        method: 'post',
        data: {
          code: aptId,
          name: aptName,
        },
      })
      return response.status
    } catch (error) {
      console.error(error)
    }
  },

  async aptExists(param: AptExistsParam) {
    const { aptId } = param
    try {
      const response = await instance(`/api/apartment/${aptId}/exist`, {
        method: 'get',
        data: {
          aptId,
        },
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  },

  async createCommunity(param: CommunityCreateParam) {
    const { aptId, aptName } = param
    try {
      const response = await instance('/api/apartment/register', {
        method: 'post',
        data: {
          code: aptId,
          name: aptName,
        },
      })
      return response.status
    } catch (error) {
      console.error(error)
    }
  },

  async getAptName(param: getAptNameParam) {
    const { aptId } = param
    try {
      const response = await instance(`/api/apartment/${aptId}`, {
        method: 'get',
        data: {
          aptId,
        },
      })
      return response.data.data
    } catch (error) {
      console.error(error)
    }
  },
}
