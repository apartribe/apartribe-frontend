export interface CommentResponse {
  results: Comment[]
  totalCount: number
}

export interface Comment {
  content: string
  createdAt: string
  createdBy: string
  id: number
  like: number
  children: Reply[]
}

export interface Reply {
  content: string
  createdAt: string
  createdBy: string
  id: number
  like: number
}
