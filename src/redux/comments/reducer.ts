//TODO : 타입 모두 수정

import { handleAsyncActions } from 'utils/redux-async-utils/handleAsyncActions'
import { reducerUtils } from 'utils/redux-async-utils/reducerUtils'
import {
  GET_COMMENTS,
  GET_COMMENTS_COUNT,
  GET_COMMENTS_COUNT_ERROR,
  GET_COMMENTS_COUNT_SUCCESS,
  GET_COMMENTS_ERROR,
  GET_COMMENTS_SUCCESS,
} from './actions'

const initialState = {
  comments: reducerUtils.initial(),
}

export const commentsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_COMMENTS:
    case GET_COMMENTS_SUCCESS:
    case GET_COMMENTS_ERROR:
      return handleAsyncActions(GET_COMMENTS, 'comments')(state, action)
    case GET_COMMENTS_COUNT:
    case GET_COMMENTS_COUNT_SUCCESS:
    case GET_COMMENTS_COUNT_ERROR:
      return handleAsyncActions(GET_COMMENTS_COUNT, 'comments')(state, action)
    default:
      return state
  }
}
