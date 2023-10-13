// http://{{host}}/api/board/2/comment?size=4&page=1

import { AxiosResponse } from 'axios'
import { CommentsData } from 'components/community/DetailCommentSection'
import { instance } from 'configs/axios'

interface GetParam {
  postId: string
  page: number
}

export interface Comments {
  data: CommentsData
  issuedAt: string
  type: string
}

export const commentsService = {
  async getComments(param: GetParam): Promise<Comments | undefined> {
    const { postId, page } = param
    try {
      const response: AxiosResponse = await instance(
        `/api/board/${postId}/comment?size=10&page=${page}`,
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
}
