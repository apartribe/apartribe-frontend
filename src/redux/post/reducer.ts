//TODO : 타입 모두 수정

import { handleAsyncActions } from 'utils/redux-async-utils/handleAsyncActions'
import { reducerUtils } from 'utils/redux-async-utils/reducerUtils'
import {
  ADD_POST,
  ADD_POST_ERROR,
  ADD_POST_SUCCESS,
  DELETE_POST,
  DELETE_POST_ERROR,
  DELETE_POST_SUCCESS,
  GET_POST,
  GET_POST_ERROR,
  GET_POST_SUCCESS,
  UPDATE_POST,
  UPDATE_POST_ERROR,
  UPDATE_POST_SUCCESS,
} from './actions'

const initialState = {
  post: reducerUtils.initial(),
}

export const postReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_POST:
    case ADD_POST_SUCCESS:
    case ADD_POST_ERROR:
      return handleAsyncActions(ADD_POST, 'post')(state, action)
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActions(GET_POST, 'post')(state, action)
    case UPDATE_POST:
    case UPDATE_POST_SUCCESS:
    case UPDATE_POST_ERROR:
      return handleAsyncActions(UPDATE_POST, 'post')(state, action)
    case DELETE_POST:
    case DELETE_POST_SUCCESS:
    case DELETE_POST_ERROR:
      return handleAsyncActions(DELETE_POST, 'post')(state, action)
    default:
      return state
  }
}
