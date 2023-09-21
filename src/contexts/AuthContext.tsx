import { createContext, useContext, ReactNode } from 'react'

type AuthProviderProps = {
  children: ReactNode
  authService: any
}

const AuthContext = createContext<any>(null)
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children, authService }: AuthProviderProps) => {
  const sendEmailAuthCode = authService.sendEmailAuthCode.bind(authService)
  const confirmEmailToken = authService.confirmEmailToken.bind(authService)
  const confirmNickname = authService.confirmNickname.bind(authService)
  const signup = authService.signup.bind(authService)

  return (
    <AuthContext.Provider
      value={{ sendEmailAuthCode, confirmEmailToken, confirmNickname, signup }}
    >
      {children}
    </AuthContext.Provider>
  )
}
