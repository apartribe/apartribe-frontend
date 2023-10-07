//TODO : 타입 모두 수정
import { Dispatch } from 'redux'

export const createPromiseThunk = (type: string, promiseCreater: any) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]

  return (param?: any) => async (dispatch: Dispatch) => {
    dispatch({ type, param })
    try {
      const payload = await promiseCreater(param)
      // if(payload === undefined) return console.log('페이로드 없는 서비스');
      dispatch({ type: SUCCESS, payload })
    } catch (error) {
      dispatch({ type: ERROR, payload: error, error: true })
    }
  }
}
