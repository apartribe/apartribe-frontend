import { AxiosResponse } from 'axios'
import { instance } from 'configs/axios'

interface ValidAnnounce {
  aptId: string
}

interface SearchPostParam {
  keyword: string
}

export const widgetService = {
  async getVaildAnnounce(param: ValidAnnounce) {
    const { aptId } = param
    try {
      const response: AxiosResponse = await instance(`/api/${aptId}/announce/widget`, {
        method: 'get',
        data: {
          floatFrom: '2023-10-21',
          floatTo: '2023-10-30',
        },
      })
      console.log('확인', response.data)
    } catch (error) {
      console.error(error)
    }
  },

  async getBestPosts() {
    try {
      const response: AxiosResponse = await instance('/api/article/best/view')
      return response.data
    } catch (error) {
      console.error(error)
    }
  },

  async getSearchPost(param: SearchPostParam) {
    const { keyword } = param
    try {
      if (!keyword) return
      const response: AxiosResponse = await instance(
        `/api/article/search?title=${keyword}`,
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
}
