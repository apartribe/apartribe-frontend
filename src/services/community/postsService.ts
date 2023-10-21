import { AxiosResponse } from 'axios'
import { instance } from 'configs/axios'

export type BoardType = 'article' | 'announce' | 'together'

interface Param {
  aptId: string
  boardType: BoardType
  category: string
  sort: string
  page: number
}

export const postsService = {
  async getPosts(param: Param) {
    // TDOD: 타입 수정
    const { aptId, boardType, category, sort, page } = param
    let response: AxiosResponse
    try {
      const mappedCategory = category === '전체' ? '' : category
      switch (boardType) {
        case 'article':
          response = await instance(`/api/${boardType}`, {
            method: 'get',
            params: {
              size: 10,
              category: mappedCategory,
              // sort,
              page,
            },
          })

          return response.data
        case 'announce':
          response = await instance(`/api/${aptId}/${boardType}`, {
            method: 'get',
            params: {
              size: 10,
              level: mappedCategory,
              sort,
              page,
            },
          })
          return response.data
        case 'together':
          response = await instance(`/api/${boardType}`, {
            method: 'get',
            params: {
              size: 10,
              category: mappedCategory,
              //sort,
              page,
            },
          })
          return response.data
        default:
          null
      }
    } catch (error) {
      console.error(error)
    }
  },
}
