export const PAGE_SETTING = '/setting'
export const PAGE_VERIFY_APT = '/setting/apartment-verification'
export const PAGE_CHANGE_PW = '/setting/pw/change'
export const PAGE_CHANGE_NICKNAME = '/setting/nickname/change'
export const PAGE_CHANGE_IMAGE = '/setting/image/change'
export const PAGE_MY_ARTICLE = '/setting/my-article'
export const PAGE_MY_COMMENT = '/setting/my-comment'

export const PAGE_ARTICLE_DETAIL = (apartCode: string, boardId: number) => {
  return `/community/${apartCode}/article/${boardId}/detail`
}
