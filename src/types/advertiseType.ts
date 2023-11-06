export type ResultWithMessage = {
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
