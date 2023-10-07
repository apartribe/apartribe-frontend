export const GET_POSTS = 'GET_POSTS'
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_ERROR = 'GET_POSTS_ERROR'

export const GET_POSTS_COUNT = 'GET_POSTS_COUNT'
export const GET_POSTS_COUNT_SUCCESS = 'GET_POSTS_COUNT_SUCCESS'
export const GET_POSTS_COUNT_ERROR = 'GET_POSTS_COUNT_ERROR'

//====

import { createPromiseThunk } from 'utils/redux-async-utils/createPromiseThunk'
import { postsService } from 'services/community/postsService'

export const getPosts = createPromiseThunk(GET_POSTS, postsService.getPosts)
