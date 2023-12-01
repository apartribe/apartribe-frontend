import { instance } from 'configs/axios'
import { AddAnnounceType } from 'types/community-type/announceType'
import dateformat from 'utils/dateFormat'

interface addParam {
  aptId: string
  boardType: 'announce'
  data: AddAnnounceType
}

interface getParam {
  aptId: string
  boardType: 'announce'
  postId: string
}

interface updateParam {
  aptId: string
  boardType: 'announce'
  postId: string
  data: AddAnnounceType
}

export const announceService = {
  async addPost(param: addParam) {
    const { aptId, boardType, data } = param
    const { category, title, content, thumbnail, floatFrom, floatTo, onlyApartUser } =
      data
    try {
      const response = await instance(`/api/${aptId}/${boardType}`, {
        method: 'post',
        data: {
          level: category,
          title,
          content,
          thumbnail,
          floatFrom: dateformat(floatFrom.toString()),
          floatTo: dateformat(floatTo.toString()),
          onlyApartUser,
        },
      })
      return response.status
    } catch (error) {
      console.error(error)
      return error
    }
  },

  async getPost(param: getParam) {
    const { aptId, boardType, postId } = param
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
    const { aptId, postId, boardType, data } = param
    const { category, title, content, thumbnail, floatFrom, floatTo, onlyApartUser } =
      data
    try {
      const response = await instance(`/api/${aptId}/${boardType}/${postId}`, {
        method: 'put',
        data: {
          level: category,
          title,
          content,
          thumbnail,
          floatFrom: dateformat(floatFrom.toString()),
          floatTo: dateformat(floatTo.toString()),
          onlyApartUser,
        },
      })
      return response.status
    } catch (error) {
      console.error(error)
    }
  },
}
