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
      return response.data // 쿠키없을 때로 에러 아니고 정성응답 주는 듯 참고
    } catch (error) {
      console.error(error)
    }
  },
  // updateComment(){},
  // deleteComment(){}
}
