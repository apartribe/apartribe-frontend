//TODO : 타입 모두 수정

import {
  GET_POSTS,
  GET_POSTS_COUNT,
  GET_POSTS_COUNT_ERROR,
  GET_POSTS_COUNT_SUCCESS,
  GET_POSTS_ERROR,
  GET_POSTS_SUCCESS,
} from './actions'
import { handleAsyncActions } from 'utils/redux-async-utils/handleAsyncActions'
import { reducerUtils } from 'utils/redux-async-utils/reducerUtils'

const initialState = {
  posts: reducerUtils.initial(),
}

export const postsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, 'posts')(state, action)
    case GET_POSTS_COUNT:
    case GET_POSTS_COUNT_SUCCESS:
    case GET_POSTS_COUNT_ERROR:
      return handleAsyncActions(GET_POSTS_COUNT, 'posts')(state, action)
    default:
      return state
  }
}
