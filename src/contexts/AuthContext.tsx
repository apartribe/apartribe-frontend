import { createContext, useContext, ReactNode } from 'react'

type AuthProviderProps = {
  children: ReactNode
  authService: any
}

const AuthContext = createContext<any>(null)
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children, authService }: AuthProviderProps) => {
  const sendEmail = authService.sendEmail.bind(authService)
  const confirmEmail = authService.confirmEmail.bind(authService)
  const checkNickname = authService.checkNickname.bind(authService)
  const signup = authService.signup.bind(authService)
  const signin = authService.signin.bind(authService)

  return (
    <AuthContext.Provider
      value={{ sendEmail, confirmEmail, checkNickname, signup, signin }}
    >
      {children}
    </AuthContext.Provider>
  )
}
