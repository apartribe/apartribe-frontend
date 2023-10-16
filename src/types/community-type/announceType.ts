/**
 * 현재 서버에서는 카테고리 항목을 level이라는 변수로 사용하고 있음.
 * 하지먼 프론트에서는 세가지 게시판이 공통 컴포넌트를 사용하는 부분에서 category를 반드시 사용해야함.
 * post나 put를 할 때에는 최종적으로 가는 데이터만 level에 넣어 보내면 상관없음.
 * 하지만 문제는 get할 때 발생함. category를 받아오면 undefined가 출력되기 때문.
 * 고로 level로 받아와서 category를 받아와야함.
 * post에는 category를 사용하고, get에는 level을 사용하는 격이기 때문에 부득이하게, 두가지 항목의 타입은 옵션으로 지정했음.
 * 코드가 다소 지저분해지는 경향이 있으니, 백엔드 측에서 당장 변경이 어렵다하여 현행 유지함.
 * 추후 개선이 된다면 물을표를 지우고 cotegory로 통일하면 되겠음.
 */

export interface AnnounceCardType {
  id: number
  category?: string
  level?: string
  title: string
  content: string
  createdBy: string
  createdAt: string
  saw: number
  liked: number
  commentCounts: number
  thumbnail: string
  // protected: boolean
}

export interface AnnounceDetailType {
  id: number
  category?: string
  level?: string
  title: string
  content: string
  createdBy: string
  createdAt: string
  saw: number
  liked: number
  commentCounts: number
  thumbnail: string
  //   recruitFrom: Date
  //   recruitTo: Date | null
  // protected: boolean
}

export interface AddAnnounceType {
  category?: string
  level?: string
  title: string
  content: string
  thumbnail: string
  // recruitFrom: Date
  // recruitTo: Date | null,
}
