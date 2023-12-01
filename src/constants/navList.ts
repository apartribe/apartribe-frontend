export const LANDING_NAV_LIST = [
  { title: '아파트라이브 소개', path: (aptId: string) => '/about' },
  {
    title: '우리 아파트 바로가기',
    path: (aptId: string) => `/community/${aptId || 'not-logged-in'}`,
  },
  // { title: '광고 / 제휴 문의', path: (aptId: string) => '/contact' },
]

// 경로 수정 필요
export const COMMUNITY_NAV_LIST = [
  { title: '커뮤니티 홈', path: (aptId: string) => `/community/${aptId}` },
  { title: '아파트 공지사항', path: (aptId: string) => `/community/${aptId}/announce` },
  { title: '같이 하실 분', path: (aptId: string) => `/community/${aptId}/together` },
]

// TODO: 빼먹은 경로들 다 여기에 추가해서 관리할 것.
// 파일명 포괄적으로 바꾸고 FIXED_BUTTON_LISTS 도 여기에 통합할 것.
// 라우터에 있는 것도 여기서 활용하면 좋을 듯.
