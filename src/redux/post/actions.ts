export const ADD_POST = 'ADD_POST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_ERROR = 'ADD_POST_ERROR'

export const GET_POST = 'GET_POST'
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
export const GET_POST_ERROR = 'GET_POST_ERROR'

export const UPDATE_POST = 'UPDATE_POST'
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS'
export const UPDATE_POST_ERROR = 'UPDATE_POST_ERROR'

export const DELETE_POST = 'DELETE_POST'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR'

//====

import { createPromiseThunk } from 'utils/redux-async-utils/createPromiseThunk'
import { postService } from 'services/community/postService'

export const addPost = createPromiseThunk(ADD_POST, postService.addPost)
export const getPost = createPromiseThunk(GET_POST, postService.getPost)
// export const updatePosts = createPromiseThunk(UPDATE_POST, postService.updatePost);
// export const deletePosts = createPromiseThunk(DELETE_POST, postService.deletePost);
