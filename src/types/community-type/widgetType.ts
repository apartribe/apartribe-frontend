export interface BestPost {
  id: number
  boardType: string
  title: string
}

export interface AptSearch {
  title: string
  id: string
  boardType: string
}

export interface VaildAnnounce {
  id: number
  level: string
  title: string
}

export interface CommentRank {
  id: number
  nickname: string
  commentCount: number
  profileImage: string
}
