export const tagRemover = (content: string) => {
  const newText = content.replace(/<[^>]*>?/g, '') // < > 로 감싸진 태그를 인식하고 빈문자열로 대체
  return newText
}
