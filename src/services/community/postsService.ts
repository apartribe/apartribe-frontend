import { AxiosResponse } from 'axios'
import { instance } from 'configs/axios'
import { AnnouncementMockType } from 'mock/announcementData'
import { BoardMockType } from 'mock/boardData'
import { GatherPeopleMockType } from 'mock/gatherPeopleData'

export type BoardType = 'article' | 'announce' | 'together'

interface Param {
  boardType: BoardType
  category: string
  sort: string
  page: number
}

export interface Posts {
  data: BoardMockType | AnnouncementMockType | GatherPeopleMockType
  issuedAt: string
  type: string
}

export const postsService = {
  async getPosts(param: Param) {
    // TDOD: 타입 수정
    const { boardType, category /* , sort */, page } = param
    let response: AxiosResponse
    try {
      const mappedCategory = category === '전체' ? '' : category
      switch (boardType) {
        case 'article':
          response = await instance(`/api/${boardType}`, {
            method: 'get',
            params: {
              size: 10,
              category: mappedCategory,
              //sort,
              page,
            },
          })

          return response.data
        case 'announce':
          response = await instance(`/api/${boardType}`, {
            method: 'get',
            params: {
              size: 10,
              level: mappedCategory,
              //sort,
              page,
            },
          })
          return response.data
        case 'together':
          response = await instance(`/api/${boardType}`, {
            method: 'get',
            params: {
              size: 10,
              category: mappedCategory,
              //sort,
              page,
            },
          })
          return response.data
        default:
          null
      }
    } catch (error) {
      console.error(error)
    }
  },
}
