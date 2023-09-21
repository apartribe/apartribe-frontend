export type InputValue = {
  email: string
  code: string
  password: string
  passwordConfirm: string
  name: string
  nickname: string
}

export type PasswordType = {
  type: 'password' | 'text'
  visible: boolean
}

export type ConfirmEmailTokenResult = {
  isEmailTokenValid: boolean
}
export type ConfirmNicknameResult = {
  isNicknameValid: boolean
}

export type FindIdPwInputValue = {
  email: string
  name: string
}

export type ResetPwInputValue = {
  password: string
  passwordConfirm: string
}
