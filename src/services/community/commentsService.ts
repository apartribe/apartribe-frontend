// http://{{host}}/api/board/2/comment?size=4&page=1

import { AxiosResponse } from 'axios'
import { Comment } from 'components/community/DetailCommentSection'
import { instance } from 'configs/axios'

interface GetParam {
  postId: string
  page: number
}

export interface CommentResponse {
  data: CommentResponseData
  issuedAt: string
  type: string
}

export interface CommentResponseData {
  results: Comment[]
  totalCount: number
}

export const commentsService = {
  async getComments(param: GetParam): Promise<CommentResponse | undefined> {
    const { postId, page } = param
    try {
      const response: AxiosResponse = await instance(
        `/api/board/${postId}/comment?size=5&page=${page}`,
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
}
