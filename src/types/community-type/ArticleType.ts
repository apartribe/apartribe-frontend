export interface ArticleCardType {
  id: number
  category: string
  title: string
  content: string
  createdAt: string
  createdBy: string
  saw: number
  liked: number
  commentCounts: number
  thumbnail: string
  profileImage: string
  // protected: boolean
}

export interface ArticleDetailType {
  id: number
  category: string
  title: string
  content: string
  createdAt: string
  createdBy: string
  liked: number
  saw: number
  commentCounts: number
  thumbnail: string
  memberLiked: boolean
  profileImage: string
  memberCreated: boolean
  // protected: boolean
}

export interface AddArticleType {
  category: string
  title: string
  content: string
  thumbnail: string
  // protected: boolean
}
