import { BoardType } from './postsService'
import { instance } from 'configs/axios'

interface PostLikeParam {
  aptId: string
  boardType: BoardType
  postId: string
}

interface CommentLikeParam {
  aptId: string
  postId: string
  commentId: number
}

export const likeService = {
  async postLike(param: PostLikeParam) {
    const { aptId, boardType, postId } = param
    try {
      const response = await instance(`/api/${aptId}/${boardType}/${postId}/like`, {
        method: 'get',
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  },

  async commentLike(param: CommentLikeParam) {
    const { aptId, postId, commentId } = param
    try {
      const response = await instance(
        `/api/${aptId}/${postId}/${commentId}/comment/like`,
        {
          method: 'get',
        },
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
}
