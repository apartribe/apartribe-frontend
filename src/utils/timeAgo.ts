import { format, register } from 'timeago.js'
import koLocale from 'timeago.js/lib/lang/ko'

export const timeAgo = (date: string, lang = 'ko') => {
  register('ko', koLocale)

  const currentDate = new Date()
  const inputDate = new Date(date)

  // 날짜 차이 계산 (밀리초)
  const timeDifference = Number(currentDate) - Number(inputDate)
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24))

  // 30일 이상 전인 경우 yyyy-mm-dd 형식으로 포맷팅
  if (daysDifference >= 30) {
    const year = inputDate.getFullYear()
    const month = String(inputDate.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
    const day = String(inputDate.getDate()).padStart(2, '0') // 일을 2자리로 포맷팅
    return `${year}-${month}-${day}`
  }

  // 7일 이내인 경우 timeago.js를 사용하여 상대적인 시간 표시
  return format(date, lang)
}
