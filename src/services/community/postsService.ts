import { AxiosResponse } from 'axios'
import { instance } from 'configs/axios'

export type BoardType = 'article' | 'announce' | 'together'

interface Param {
  aptId: string
  boardType: BoardType
  category: string
  sort: string
  order?: string // together 위젯은 sort지정 없기떄문에 일단 선택사항 (임시)
  page?: number
}

export const postsService = {
  async getPosts(param: Param) {
    const { aptId, boardType, category, sort, order, page } = param
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
              sort: `${sort},${order}`,
              page,
            },
          })
          return response.data
        case 'together':
          response = await instance(`/api/${aptId}/${boardType}`, {
            method: 'get',
            params: {
              size: 10,
              category: mappedCategory,
              sort: `${sort},${order}`,
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
