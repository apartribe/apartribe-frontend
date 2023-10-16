import { AxiosResponse } from 'axios'
import { instance } from 'configs/axios'
import { CommentResponse } from 'types/community-type/commentType'

interface GetParam {
  postId: string
  page: number
}

export const commentsService = {
  async getComments(param: GetParam): Promise<CommentResponse | undefined> {
    const { postId, page } = param
    try {
      const response: AxiosResponse = await instance(
        `/api/board/${postId}/comment?size=5&page=${page}`,
      )

      return response.data.data
    } catch (error) {
      console.error(error)
    }
  },
}
