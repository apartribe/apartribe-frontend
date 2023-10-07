import { AxiosResponse } from 'axios'
import { BoardType } from './postsService'
import { instance } from 'configs/axios'

interface AddPost {
  category: string
  protected: boolean
  title: string
  content: string
}

interface addParam {
  boardType: BoardType
  data: AddPost
}

interface getParam {
  boardType: BoardType
  postId: number
}

export const postService = {
  async addPost(param: addParam) {
    const { boardType, data } = param
    try {
      const response: AxiosResponse = await instance(`/api/${boardType}`, {
        method: 'post',
        data,
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  },

  async getPost(param: getParam) {
    const { boardType, postId } = param
    try {
      const response: AxiosResponse = await instance(`/api/${boardType}/${postId}`, {
        method: 'get',
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
}

// import { AxiosResponse } from "axios";
// import { instance } from "configs/axios"

// export type BoardType = 'article' | 'announce' | 'gether-people';

// interface Param {
//     boardType:BoardType, category:string, page:number
// }

// export const postsService = {
//     async getPosts (param:Param): Promise<any> { // TDOD: 타입 수정
//         const {boardType, category, page} = param;
//         try{
//             const response: AxiosResponse = await instance(`/api/${boardType}`, {
//             method: 'get',
//             params:{
//                 size: 10,
//                 category,
//                 page
//             }
//         })
//         return response.data;
//         } catch (error) {
//             console.error(error);

//         }
//     },
//     // getPostsCount,
// }
