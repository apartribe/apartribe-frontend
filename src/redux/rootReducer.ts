import { combineReducers } from 'redux'
import { postReducer } from './post/reducer'
import { postsReducer } from './posts/reducer'
import { commentsReducer } from './comments/reducer'
import { commentReducer } from './comment/reducer'
import { replyReducer } from './reply/reducer'

export const rootReducer = combineReducers({
  posts: postsReducer,
  post: postReducer,
  comments: commentsReducer,
  comment: commentReducer,
  reply: replyReducer,
})
