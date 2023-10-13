import { AnnouncementMockType } from 'mock/announcementData'
import { BoardMockType } from 'mock/boardData'
import { GatherPeopleMockType } from 'mock/gatherPeopleData'

export interface Payload {
  data: BoardMockType | AnnouncementMockType | GatherPeopleMockType
}

export const reducerUtils = {
  initial: () => ({
    loading: false,
    data: [],
    error: null,
  }),
  loading: (prevState = []) => ({
    loading: true,
    data: prevState,
    error: null,
  }),
  success: (payload: Payload) => ({
    loading: false,
    data: payload.data,
    error: null,
  }),
  error: (error: Payload) => ({
    loading: false,
    data: null,
    error: error,
  }),
}
