import { AxiosResponse } from 'axios'
import { instance } from 'configs/axios'

interface SearchPostParam {
  keyword: string
}

export const widgetService = {
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
