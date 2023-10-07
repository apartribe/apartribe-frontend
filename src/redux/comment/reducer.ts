//TODO : 타입 모두 수정

import { handleAsyncActions } from 'utils/redux-async-utils/handleAsyncActions'
import { reducerUtils } from 'utils/redux-async-utils/reducerUtils'
import {
  ADD_COMMENT,
  ADD_COMMENT_ERROR,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT,
  DELETE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
  GET_COMMENT,
  GET_COMMENT_ERROR,
  GET_COMMENT_SUCCESS,
  UPDATE_COMMENT,
  UPDATE_COMMENT_ERROR,
  UPDATE_COMMENT_SUCCESS,
} from './actions'

const initialState = {
  comment: reducerUtils.initial(),
}

export const commentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_COMMENT:
    case ADD_COMMENT_SUCCESS:
    case ADD_COMMENT_ERROR:
      return handleAsyncActions(ADD_COMMENT, 'comment')(state, action)
    case GET_COMMENT:
    case GET_COMMENT_SUCCESS:
    case GET_COMMENT_ERROR:
      return handleAsyncActions(GET_COMMENT, 'comment')(state, action)
    case UPDATE_COMMENT:
    case UPDATE_COMMENT_SUCCESS:
    case UPDATE_COMMENT_ERROR:
      return handleAsyncActions(UPDATE_COMMENT, 'comment')(state, action)
    case DELETE_COMMENT:
    case DELETE_COMMENT_SUCCESS:
    case DELETE_COMMENT_ERROR:
      return handleAsyncActions(DELETE_COMMENT, 'comment')(state, action)
    default:
      return state
  }
}
