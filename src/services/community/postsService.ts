import { AxiosResponse } from 'axios'
import { instance } from 'configs/axios'

export type BoardType = 'article' | 'announce' | 'gether-people'

interface Param {
  boardType: BoardType
  category: string
  page: number
}

export const postsService = {
  async getPosts(param: Param): Promise<any> {
    // TDOD: 타입 수정
    const { boardType, category, page } = param
    try {
      const response: AxiosResponse = await instance(`/api/${boardType}`, {
        method: 'get',
        params: {
          size: 10,
          category,
          page,
        },
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  // getPostsCount,
}
