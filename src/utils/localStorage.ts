const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN'
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN'

export const setAccessToken = (token: string) =>
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY)
export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY)

// ===========================================================

export const setRefreshToken = (token: string) =>
  localStorage.setItem(REFRESH_TOKEN_KEY, token)
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY)
export const removeRefreshToken = () => localStorage.removeItem(REFRESH_TOKEN_KEY)
