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

export type Result = {
  result: 'success' | 'fail'
  message: string
}

export type ContactInputValue = {
  dataCollectAgree: boolean
  name: string
  nonAuth: boolean
  email: string
  code: string
  title: string
  content: string
}
