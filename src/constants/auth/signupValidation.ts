export const signupValidation = {
  email: {
    validator: (email: string) => {
      const regex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
      return regex.test(email)
    },
    invalidMessage: '올바른 이메일 주소가 아닙니다.',
  },
  code: {
    validator: (code: string) => {
      return code.length !== 0
    },
  },
  password: {
    validator: (password: string) => {
      const regex = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/
      return regex.test(password)
    },
    invalidMessage:
      '영문, 숫자, 특수문자를 포함한 8자리 이상 20자리 이하의 비밀번호를 입력해주세요.',
  },
  passwordConfirm: {
    validator: (password: string, passwordConfirm: string) => {
      return Object.is(password, passwordConfirm)
    },
    invalidMessage: '비밀번호가 일치하지 않습니다.',
  },
  name: {
    validator: (name: string) => {
      return name.length !== 0
    },
  },
  nickname: {
    validator: (nickname: string) => {
      return nickname.length !== 0
    },
  },
}
