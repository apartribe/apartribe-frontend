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
}
