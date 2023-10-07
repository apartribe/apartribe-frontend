//TODO : 타입 모두 수정

import { handleAsyncActions } from 'utils/redux-async-utils/handleAsyncActions'
import { reducerUtils } from 'utils/redux-async-utils/reducerUtils'
import {
  ADD_REPLY,
  ADD_REPLY_ERROR,
  ADD_REPLY_SUCCESS,
  DELETE_REPLY,
  DELETE_REPLY_ERROR,
  DELETE_REPLY_SUCCESS,
  GET_REPLY,
  GET_REPLY_ERROR,
  GET_REPLY_SUCCESS,
  UPDATE_REPLY,
  UPDATE_REPLY_ERROR,
  UPDATE_REPLY_SUCCESS,
} from './actions'

const initialState = {
  reply: reducerUtils.initial(),
}

export const replyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_REPLY:
    case ADD_REPLY_SUCCESS:
    case ADD_REPLY_ERROR:
      return handleAsyncActions(ADD_REPLY, 'reply')(state, action)
    case GET_REPLY:
    case GET_REPLY_SUCCESS:
    case GET_REPLY_ERROR:
      return handleAsyncActions(GET_REPLY, 'reply')(state, action)
    case UPDATE_REPLY:
    case UPDATE_REPLY_SUCCESS:
    case UPDATE_REPLY_ERROR:
      return handleAsyncActions(UPDATE_REPLY, 'reply')(state, action)
    case DELETE_REPLY:
    case DELETE_REPLY_SUCCESS:
    case DELETE_REPLY_ERROR:
      return handleAsyncActions(DELETE_REPLY, 'reply')(state, action)
    default:
      return state
  }
}
