import { AxiosResponse } from 'axios'
import { instance } from 'configs/axios'
import { BoardType } from './postsService'

interface getParam {
  boardType: BoardType
}

interface addParam {
  boardType: BoardType
  data: string
}

export const categoryService = {
  async addCategory(param: addParam) {
    const { boardType, data } = param
    const response: AxiosResponse = await instance(`/api/category/${boardType}/add`, {
      method: 'post',
      data: {
        category: data,
      },
    })
    return response.data
  },

  async getCategory(param: getParam) {
    const { boardType } = param
    if (boardType === 'announce')
      return {
        data: [
          { categoryName: '일반' },
          { categoryName: '긴급' },
          { categoryName: '비상' },
        ],
      }
    const response: AxiosResponse = await instance(`/api/category/${boardType}/list`, {
      method: 'get',
    })
    return response.data
  },
}
