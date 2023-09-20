export const signupValidation = {
  email: {
    validator: (email: string) => {
      const regex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
      return regex.test(email)
    },
    invalidMessage: '올바른 이메일 주소가 아닙니다.',
  },
  emailAuthCode: {
    validator: (emailAuthCode: string) => {
      return emailAuthCode.length !== 0
    },
  },
  password1: {
    validator: (password1: string) => {
      const regex = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/
      return regex.test(password1)
    },
    invalidMessage:
      '영문, 숫자, 특수문자를 포함한 8자리 이상 20자리 이하의 비밀번호를 입력해주세요.',
  },
  password2: {
    validator: (password1: string, password2: string) => {
      return Object.is(password1, password2)
    },
    invalidMessage: '입력하신 비밀번호가 일치하지 않습니다.',
  },
  nickname: {
    validator: (nickname: string) => {
      return nickname.length !== 0
    },
  },
}
