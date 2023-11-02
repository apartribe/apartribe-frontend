// TODO : 타입 모두 수정
// import { Dispatch } from 'redux'
// import { BoardType, Posts } from 'services/community/postsService'

// interface Param {
//   boardType: BoardType
//   category: string
//   page: number
//   sort: string
// }

// export const createPromiseThunk = (
//   type: string,
//   promiseCreater: (param: Param) => Promise<Posts | undefined>,
// ) => {
//   const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]

//   return (param: Param) => async (dispatch: Dispatch) => {
//     dispatch({ type, param })
//     try {
//       const payload = await promiseCreater(param)
//       dispatch({ type: SUCCESS, payload })
//     } catch (error) {
//       dispatch({ type: ERROR, payload: error, error: true })
//     }
//   }
// }

export {}
