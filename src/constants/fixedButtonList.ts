export const FIXED_BUTTON_LISTS = [
  {
    option: '공지사항 작성',
    path: (aptId: string) => `/community/${aptId}/announce/add`,
  },
  {
    option: '같이 하실 분 작성',
    path: (aptId: string) => `/community/${aptId}/together/add`,
  },
  {
    option: '일반 게시물 작성',
    path: (aptId: string) => `/community/${aptId}/article/add`,
  },
]
