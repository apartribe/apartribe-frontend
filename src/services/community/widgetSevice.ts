import { AxiosResponse } from 'axios'
import { instance } from 'configs/axios'
import { BoardType } from './postsService'

interface ValidAnnounce {
  aptId: string
}

interface BestPostsParam {
  aptId: string
}

interface SearchPostParam {
  aptId: string
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

  async getBestPosts(param: BestPostsParam) {
    const { aptId } = param
    try {
      const response: AxiosResponse = await instance(`/api/${aptId}/article/best/view`, {
        method: 'get',
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  },

  async getSearchPost(param: SearchPostParam) {
    const { aptId, keyword } = param
    try {
      if (!keyword) return
      const response: AxiosResponse = await instance(`/api/${aptId}/article/search`, {
        method: 'get',
        params: {
          title: keyword,
        },
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
}
