export interface Comment {
  childCounts: number
  commentId: number
  content: string
  createdAt: string
  createdBy: string
  liked: number
  memberCreated: boolean
  memberLiked: boolean
  profileImage: string
  children: Reply[]
  id?: number // 임시로 사용.
}

export interface Reply {
  commentId: number
  content: string
  createdAt: string
  createdBy: string
  liked: number
  memberCreated: boolean
  memberLiked: boolean
  parentId: number
  profileImage: string
  id?: number // 임시로 사용.
}
