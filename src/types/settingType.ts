export type MyInfo = {
  email: string
  name: string
  nickname: string
  profileImageUrl: string
  apartName: string
}

export type ChangePwInputValue = {
  password: string
  newPassword: string
  newPasswordConfirm: string
}

export type MyArticle = {
  id: number
  apartCode: string
  boardType: string
  category?: string
  level?: string
  title: string
  content: string
  liked: number
  saw: number
  thumbnail: string
  commentCounts: number
  createdAt: string
  createdBy: string
}

export type MyComment = {
  id: number
  apartCode: string
  boardId: number
  boardType: string
  category?: string
  level?: string
  boardTitle: string
  content: string
  createdBy: string
  createdAt: string
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
