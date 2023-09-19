export const PAGE_SIGNUP_SELECT = '/signup/select'
export const PAGE_LOCAL_SIGNUP = '/signup/local'
export const PAGE_LOGIN = '/login'
export const PAGE_FIND_ID = '/find/id'
export const PAGE_FIND_PW = '/find/pw'
export const PAGE_RESET_PW = '/find/pw/reset'

//export const KAKAO_AUTH_URL = `${BASE_URL}/oauth2/authorization/kakao`
export const KAKAO_AUTH_URL = ''
export const NAVER_AUTH_URL = ''
export const GOOGLE_AUTH_URL = ''

export const TERMS_AND_CONDITIONS_LIST = [
  {
    id: 0,
    title: '만 14세 이상입니다.',
    isMandatory: '필수',
  },
  {
    id: 1,
    title: '저작권 안내를 확인했습니다.',
    isMandatory: '필수',
    fileName: 'copyright_info',
  },
  {
    id: 2,
    title: '서비스 이용약관에 동의합니다.',
    isMandatory: '필수',
    fileName: 'terms_of_service',
  },
  {
    id: 3,
    title: '개인정보 수집 및 이용에 동의합니다.',
    isMandatory: '필수',
    fileName: 'private_information_collection_and_use',
  },
  {
    id: 4,
    title: '홍보 및 마케팅 이용에 동의합니다.',
    isMandatory: '선택',
    fileName: 'promotion_and_marketing_use',
  },
]
