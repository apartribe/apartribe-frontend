import axios from 'axios'
import { getAccessToken } from 'utils/localStorage'
import { toast } from 'react-toastify'

export const instance = axios.create({
  baseURL: 'http://ec2-15-165-196-198.ap-northeast-2.compute.amazonaws.com:8080',
  timeout: 4000,
})

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken()

    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },

  (error) => {
    console.error(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    return response
  },

  (error) => {
    // navigate를 사용할 수 없기 때문에, 불가피하게 새로고침을 유발한다는 한계점이 있음.
    // 하지만, 대부분의 경우 ProtectedRouter에서 리다이렉팅 될 것이기 때문에 실제로 작동할 상황은 한정적임.
    const errorMessage = error.response.data.data.error

    if (
      errorMessage === '토큰 만료.' ||
      errorMessage === '토큰 서명 검증 실패.' ||
      errorMessage === 'Refresh Token 불일치.' ||
      errorMessage === '토큰 에러'
    ) {
      toast.error('401 : 세션이 만료 되었습니다. 다시 로그인해주세요.')
      return error
    }

    switch (error.response.status) {
      case 400:
        toast.error('400 : 잘못된 요청입니다. 다시 확인해주세요.')
        return error.response
      case 401:
        return error.response
      case 403:
        toast.error('403 : 접근할 수 있는 권한이 없습니다.')
        return error.response
      case 404:
        toast.error('404 : 잘못된 접근입니다.')
        return error.response
      case 500:
        toast.error('500 : 서버에 내부에 문제가 발생하였습니다.')
        return error.response
      case 502:
        toast.error('502 : 서버에 접근할 수 없습니다.')
        return error.response
      default:
        return error.response
    }
  },
)
