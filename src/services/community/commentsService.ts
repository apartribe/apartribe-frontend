import { AxiosResponse } from 'axios'
import { instance } from 'configs/axios'

interface GetParam {
  aptId: string
  postId: string
}

export const commentsService = {
  async getComments(param: GetParam) {
    const { aptId, postId } = param
    try {
      const response: AxiosResponse = await instance(`/api/${aptId}/${postId}/comment`)
      return response.data.data
    } catch (error) {
      console.error(error)
    }
  },
}
