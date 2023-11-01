import { instance } from 'configs/axios'

interface AddParam {
  aptId: string
  postId: string
  content: string
}

interface UpdateParam {
  aptId: string
  postId: string
  commentId: number
  content: string
}

export const commentService = {
  async addComment(param: AddParam) {
    const { aptId, postId, content } = param
    try {
      const response = await instance(`/api/${aptId}/${postId}/comment`, {
        method: 'post',
        data: {
          content,
        },
      })
      return response.data // 쿠키없을 때로 에러 아니고 정성응답 주는 듯 참고
    } catch (error) {
      console.error(error)
    }
  },

  async updateComment(param: UpdateParam) {
    const { aptId, postId, commentId, content } = param
    try {
      const response = await instance(`api/${aptId}/${postId}/comment`, {
        method: 'put',
        data: {
          commentId,
          content,
        },
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  // deleteComment(){}
}
