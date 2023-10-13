import { instance } from 'configs/axios'

interface AddParam {
  postId: string
  content: string
}

export const commentService = {
  async addComment(param: AddParam) {
    const { postId, content } = param
    try {
      const response = await instance(`/api/board/${postId}/comment`, {
        method: 'post',
        data: {
          content,
        },
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  // updateComment(){},
  // deleteComment(){}
}
