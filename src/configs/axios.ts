import axios from 'axios'
import { getAccessToken } from 'utils/localStorage'

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
