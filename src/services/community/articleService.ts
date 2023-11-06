import axios from 'axios'
import { BoardType } from './postsService'
import { instance } from 'configs/axios'
import { AddArticleType } from 'types/community-type/ArticleType'

interface addParam {
  aptId: string
  boardType: BoardType
  data: AddArticleType
}

interface getParam {
  aptId: string
  boardType: BoardType
  postId: string
}

interface updateParam {
  aptId: string
  boardType: BoardType
  data: AddArticleType
  postId: string
}

interface deleteParam {
  boardType: BoardType
  postId: string
  aptId: string
}

export const articleService = {
  async addPost(param: addParam) {
    const { aptId, boardType, data } = param
    const { category, title, content, thumbnail, onlyApartUser } = data
    try {
      const response = await instance(`/api/${aptId}/${boardType}`, {
        method: 'post',
        data: {
          category,
          title,
          content,
          thumbnail,
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
    const { aptId, boardType, data, postId } = param
    const { category, title, content, thumbnail, onlyApartUser } = data

    try {
      const response = await instance(`/api/${aptId}/${boardType}/${postId}`, {
        method: 'put',
        data: {
          category,
          title,
          content,
          thumbnail,
          onlyApartUser,
        },
      })
      return response.status
    } catch (error) {
      console.error(error)
    }
  },

  async deletePost(param: deleteParam) {
    const { aptId, boardType, postId } = param
    try {
      const response = await instance(`/api/${aptId}/${boardType}/${postId}`, {
        method: 'delete',
      })
      return response.status
    } catch (error) {
      console.error(error)
    }
  },
}
