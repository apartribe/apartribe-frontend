import { instance } from 'configs/axios'

interface AddParam {
  postId: string
  parentId: number
  content: string
}

export const replyService = {
  async addReply(param: AddParam) {
    const { postId, parentId, content } = param
    try {
      const response = await instance(`/api/board/${postId}/comment`, {
        method: 'post',
        data: {
          parentId,
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
