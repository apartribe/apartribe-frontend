import { instance } from 'configs/axios'

interface AddParam {
  aptId: string
  postId: string
  parentId: number
  content: string
}

export const replyService = {
  async addReply(param: AddParam) {
    const { aptId, postId, parentId, content } = param
    try {
      const response = await instance(`/api/${aptId}/board/${postId}/comment/reply`, {
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
