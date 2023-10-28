import { AxiosResponse } from 'axios'
import { instance } from 'configs/axios'
import { BoardType } from './postsService'

interface getParam {
  aptId: string
  boardType: BoardType
}

interface addParam {
  aptId: string
  boardType: BoardType
  data: string
}

export const categoryService = {
  async addCategory(param: addParam) {
    const { aptId, boardType, data } = param
    const response: AxiosResponse = await instance(
      `/api/${aptId}/category/${boardType}/add`,
      {
        method: 'post',
        data: {
          category: data,
        },
      },
    )
    return response.data
  },

  async getCategory(param: getParam) {
    const { aptId, boardType } = param
    if (boardType === 'announce')
      return {
        data: [
          { categoryName: '일반' },
          { categoryName: '긴급' },
          { categoryName: '비상' },
        ],
      }
    const response: AxiosResponse = await instance(
      `/api/${aptId}/category/${boardType}/list`,
      {
        method: 'get',
      },
    )
    return response.data
  },
}
