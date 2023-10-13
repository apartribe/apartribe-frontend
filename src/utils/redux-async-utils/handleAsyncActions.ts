import { reducerUtils } from './reducerUtils'
import { Action } from 'redux/posts/reducer'

export const handleAsyncActions = (type: string, key: string) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]
  return (state: any, action: Action) => {
    //TODO : 타입 수정 요망

    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(),
        }
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload),
        }
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        }
      default:
        return state
    }
  }
}
