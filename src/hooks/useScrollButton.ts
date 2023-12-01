import { MutableRefObject, useRef, useState } from 'react'

type Ref = MutableRefObject<HTMLDivElement | null>
type Method = () => void

type ReturnType = [Ref, Method, Method]

export const useScrollButton: () => ReturnType = () => {
  const [scrollPosition, setScrollPosition] = useState(0) // 초기 스크롤 위치 0

  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  // 한 번에 이동할 거리
  const scrollStep = 300

  //=================================
  // 스크롤을 오른쪽으로 이동하는 함수
  const scrollRight: () => void = () => {
    if (!scrollContainerRef.current) return

    const scrollContainer = scrollContainerRef.current

    // 현재 스크롤 위치에 scrollStep을 더하여 오른쪽으로 이동
    setScrollPosition(scrollPosition + scrollStep)

    // 스크롤 컨테이너를 부드럽게 스크롤
    scrollContainer.scrollTo({
      left: scrollPosition + scrollStep,
      behavior: 'smooth',
    })
  }

  //=================================

  // 스크롤을 왼쪽으로 이동하는 함수
  const scrollLeft: () => void = () => {
    if (!scrollContainerRef.current) return
    const scrollContainer = scrollContainerRef.current

    // 현재 스크롤 위치에서 scrollStep을 빼서 왼쪽으로 이동
    const newScrollLeft = Math.max(scrollPosition - scrollStep, 0)
    setScrollPosition(newScrollLeft)

    // 스크롤 컨테이너를 부드럽게 스크롤
    scrollContainer.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    })
  }
  //=================================
  return [scrollContainerRef, scrollRight, scrollLeft]
}
