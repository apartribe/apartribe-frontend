import axios, { AxiosResponse } from 'axios'
import { BoardType } from './postsService'
import { instance } from 'configs/axios'
import { AddArticleType } from 'types/community-type/ArticleType'

interface addParam {
  boardType: BoardType
  data: AddArticleType
}

interface getParam {
  boardType: BoardType
  aptId: string
  postId: string
}

interface updateParam {
  boardType: BoardType
  data: AddArticleType
  postId: string
}

interface deleteParam {
  boardType: BoardType
  postId: string
}

export const postService = {
  async addPost(param: addParam) {
    const { boardType, data } = param
    const { category, title, content, thumbnail } = data
    try {
      await instance(`/api/${boardType}`, {
        method: 'post',
        data: {
          category,
          title,
          content,
          thumbnail,
        },
      })
      return {
        statusCode: 201,
        message: '게시물이 등록되었습니다. 커뮤니티로 이동합니다.',
      }
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error)) {
        return {
          statusCode: 500,
          message: '게시물 등록에 실패하였습니다. 다시 시도해주세요.',
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },

  async getPost(param: getParam) {
    const { boardType /* , aptId */, postId } = param
    try {
      const response: AxiosResponse = await instance(`/api/${boardType}/${postId}`, {
        // TODO: 아파트 아이디 추가 필요
        method: 'get',
      })

      return response.data
    } catch (error) {
      console.error(error)
    }
  },

  async updatePost(param: updateParam) {
    const { boardType, data, postId } = param
    const { category, title, content } = data

    try {
      await instance(`/api/${boardType}/${postId}`, {
        method: 'put',
        data: {
          category,
          title,
          content,
        },
      })
      return {
        statusCode: 201,
        message: '게시물이 수정되었습니다. 수정된 게시물로 이동합니다.',
      }
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error)) {
        return {
          statusCode: 500,
          message: '게시물 수정에 실패하였습니다. 다시 시도해주세요.',
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },

  async deletePost(param: deleteParam) {
    const { boardType, postId } = param
    try {
      await instance(`/api/${boardType}?${boardType}Id=${postId}`, {
        method: 'delete',
      })
      return {
        statusCode: 204,
        message: '게시물이 삭제되었습니다. 커뮤니티로 이동합니다.',
      }
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error)) {
        return {
          statusCode: 500,
          message: '게시물 삭제에 실패하였습니다. 다시 시도해주세요.',
        }
      } else {
        throw new Error('different error than axios')
      }
    }
  },
}
