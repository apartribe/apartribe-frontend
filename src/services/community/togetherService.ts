import { BoardType } from './postsService'
import { instance } from 'configs/axios'
import { AddTogetherType, UpdateTogetherType } from 'types/community-type/togetherType'
import dateformat from 'utils/dateFormat'

interface addParam {
  aptId: string
  boardType: BoardType
  data: AddTogetherType
}

interface getParam {
  boardType: BoardType
  aptId: string
  postId: string
}

interface updateParam {
  aptId: string
  boardType: BoardType
  data: UpdateTogetherType
  postId: string
}

export const togetherService = {
  async addPost(param: addParam) {
    const { aptId, boardType, data } = param
    const {
      category,
      title,
      content,
      thumbnail,
      description,
      recruitFrom,
      recruitTo,
      meetTime,
      target,
      location,
      contributeStatus,
    } = data

    try {
      const response = await instance(`/api/${aptId}/${boardType}`, {
        method: 'post',
        data: {
          category,
          title,
          content,
          thumbnail,
          description,
          recruitFrom: dateformat(recruitFrom.toString()),
          recruitTo: dateformat(recruitTo.toString()),
          meetTime,
          target,
          location,
          contributeStatus,
        },
      })
      return response.status
    } catch (error) {
      console.error(error)
      return error
    }
  },

  async getPost(param: getParam) {
    const { boardType, aptId, postId } = param
    try {
      const response = await instance(`/api/${aptId}/${boardType}/${postId}`, {
        method: 'get',
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  },

  async updatePost(param: updateParam) {
    const { aptId, boardType, data, postId } = param
    const {
      category,
      title,
      content,
      thumbnail,
      description,
      recruitFrom,
      recruitTo,
      meetTime,
      target,
      location,
      contributeStatus,
      recruitStatus,
    } = data

    try {
      const response = await instance(`/api/${aptId}/${boardType}/${postId}`, {
        method: 'put',
        data: {
          category,
          title,
          content,
          thumbnail,
          description,
          recruitFrom: dateformat(recruitFrom.toString()),
          recruitTo: dateformat(recruitTo.toString()),
          meetTime,
          target,
          location,
          contributeStatus,
          recruitStatus,
        },
      })
      return response.status
    } catch (error) {
      console.error(error)
    }
  },
}
