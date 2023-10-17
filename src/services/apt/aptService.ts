import { AxiosResponse } from 'axios'
import { instance } from 'configs/axios'

interface aptExists {
  aptId: string
}

export const aptService = {
  async aptExists(param: aptExists) {
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
      console.error(error)
    }
  },
}
