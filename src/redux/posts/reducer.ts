//TODO : 타입 모두 수정

import { GET_POSTS, GET_POSTS_ERROR, GET_POSTS_SUCCESS } from './actions'
import { handleAsyncActions } from 'utils/redux-async-utils/handleAsyncActions'
import { Payload, reducerUtils } from 'utils/redux-async-utils/reducerUtils'

const initialState = {
  posts: reducerUtils.initial(),
}

export interface Action {
  type: string
  payload: Payload
}

export const postsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, 'posts')(state, action)
    default:
      return state
  }
}
