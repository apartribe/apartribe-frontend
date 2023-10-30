import { AxiosResponse } from 'axios'
import { BoardType } from './postsService'
import { instance } from 'configs/axios'

interface LikeParam {
  aptId: string
  boardType: BoardType
  postId: string
}

export const likeService = {
  async postLike(param: LikeParam) {
    const { aptId, boardType, postId } = param
    try {
      const response: AxiosResponse = await instance(
        `/api/${aptId}/${boardType}/${postId}/like`,
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
