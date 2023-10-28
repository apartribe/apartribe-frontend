// recruitFrom, recruitTo 의 경우, 서버에서는 string으로 입력받고, 프론트에서는 Date로 사용되므로,
// 받아올 때는, string으로 받아오고, 보낼 때는 Date로 사용하다 마지막 api 호출 때만 string으로 변환해서 보내고 있음.
// 때문에 string 타입과, Date 타입이 혼재하는 점 주의할 것.

export interface TogetherCardType {
  id: number
  category: string
  recruitStatus: string
  title: string
  createdAt: string
  createdBy: string
  saw: number
  liked: number
  commentCounts: number
  description: string
  thumbnail: string
  // protected: boolean
}

export interface TogetherDetailType {
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
  recruitFrom: string
  recruitTo: string
  meetTime: string
  location: string
  target: string
  contributeStatus: boolean
  recruitStatus: string
  memberLiked: boolean
  profileImage: string
  // protected: boolean
}

export interface AddTogetherType {
  category: string
  title: string
  content: string
  thumbnail: string
  description: string
  recruitFrom: Date
  recruitTo: Date
  meetTime: string
  target: string
  location: string
  contributeStatus: boolean
  // protected: boolean
}

export interface UpdateTogetherType {
  category: string
  title: string
  content: string
  thumbnail: string
  description: string
  recruitFrom: Date
  recruitTo: Date
  meetTime: string
  target: string
  location: string
  contributeStatus: boolean
  recruitStatus: '모집 예정' | '모집중' | '모집 완료' // AddTogetherType와 차이점.
  // protected: boolean
}
