export interface DetailCommentData {
  id: number
  avatar: string
  createdBy: string
  createdAt: string
  content: string
  liked: number
  replyCount: number
  relies: DetailReplyData[]
}

export interface DetailReplyData {
  id: number
  content: string
  liked: number
  createdAt: string
  createdBy: string
  avatar: string
}
