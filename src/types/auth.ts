export type SignupInputValue = {
  email: string
  code: string
  password: string
  passwordConfirm: string
  name: string
  nickname: string
  terms_and_conditions?: boolean
}

export type SigninInputValue = {
  email: string
  password: string
}

export type PasswordType = {
  type: 'password' | 'text'
  visible: boolean
}

type Result = {
  result: 'success' | 'fail'
  message: string
}

export type SendEmailResult = Result
export type ConfirmEmailResult = Result
export type CheckNicknameResult = Result
export type SignupResult = Result

export type Message = {
  status: 'waiting' | 'success' | 'fail'
  message: string
  todo?: () => void
}

export type SigninResult = Result

export type FindIdPwInputValue = {
  email: string
  name: string
}

export type ResetPwInputValue = {
  password: string
  passwordConfirm: string
}
