export type SignupInputValue = {
  email: string
  code: string
  password: string
  passwordConfirm: string
  name: string
  nickname: string
}

export type TermsAndConditionsValue = {
  goeFourteen: boolean
  confirmCopyright: boolean
  useAgree: boolean
  dataCollectAgree: boolean
  advertiseAgree?: boolean
}

export type SigninInputValue = {
  email: string
  password: string
}

export type PasswordType = {
  type: 'password' | 'text'
  visible: boolean
}

export type ResultWithMessage = {
  result: 'success' | 'fail'
  message: string
}

export type ResultWithData = {
  result: 'success'
  data: any
}

export type Message = {
  status: 'waiting' | 'success' | 'fail'
  message: string
  todo?: () => void
  goTo?: string
}

export type FindPwInputValue = {
  email: string
  name: string
}

export type ResetPwInputValue = {
  password: string
  passwordConfirm: string
  identifier: string
}
