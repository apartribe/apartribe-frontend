export type MyInfo = {
  email: string
  name: string
  nickname: string
  profileImageUrl: string
  //TODO: 아파트명, 인증여부 백엔드에서 값 넘겨주면 아래 주석 제거해서 변수명 수정
  /* aptName: string 
  badge: string  */
}

export type ChangePwInputValue = {
  password: string
  newPassword: string
  newPasswordConfirm: string
}

export type MyArticle = {
  id: number
  boardType: string
  liked: number
  saw: number
  title: string
  content: string
  thumbnail: string
  commentCounts: number
  createdAt: string
  createdBy: string
}

export type MyComment = {
  id: number
  content: string
  createdBy: string
  createdAt: string
  boardType: string
  boardId: number
}

export type ResultWithMessage = {
  result: 'success' | 'fail'
  message: string
}

export type ResultWithData = {
  result: 'success'
  data: any
}
