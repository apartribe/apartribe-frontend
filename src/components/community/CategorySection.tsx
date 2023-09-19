import React, {
  Dispatch,
  FC,
  LegacyRef,
  MouseEvent,
  MutableRefObject,
  useRef,
  useState,
} from 'react'
import { styled } from 'styled-components'
import { ArrowButton } from 'styles/reusable-style/elementStyle'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { AiOutlinePlus } from 'react-icons/ai'
import { useInView } from 'react-intersection-observer'

interface Props {
  selectedCategory: string
  setSelectedCategory: Dispatch<React.SetStateAction<string>>
  categoryList: string[]
  useArrow?: boolean
  canCreate?: boolean
}

const CategorySection: FC<Props> = ({
  selectedCategory,
  setSelectedCategory,
  categoryList,
  useArrow = false,
  canCreate = false,
}) => {
  const { ref: firstCategoryRef, inView: firstInViewport } = useInView({
    threshold: 1,
  })
  const { ref: lastCategoryRef, inView: lastInViewport } = useInView({
    threshold: 1,
  })

  const decideRef = (index: number): LegacyRef<HTMLButtonElement> | undefined => {
    if (index === 0) return firstCategoryRef
    if (index === categoryList.length - 1) return lastCategoryRef
    return undefined
  }

  //=================================

  const [scrollPosition, setScrollPosition] = useState(0) // 초기 스크롤 위치는 0

  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  // 스크롤을 오른쪽으로 이동하는 함수
  const scrollRight = () => {
    if (!scrollContainerRef.current) return

    const scrollContainer = scrollContainerRef.current

    // 한 번에 이동할 거리
    const scrollStep = 300

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
  const scrollLeft = () => {
    if (!scrollContainerRef.current) return
    const scrollContainer = scrollContainerRef.current

    // 한 번에 이동할 거리 (예: 100px)
    const scrollStep = 300

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

  const changeSeletedCategory = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(e.currentTarget.innerText)
  }

  return (
    <StyledWarpper>
      <StyledDiv>
        {useArrow && (
          <ArrowButton onClick={scrollLeft} className={firstInViewport ? 'disabled' : ''}>
            <IoIosArrowBack />
          </ArrowButton>
        )}
        <StyledArea ref={scrollContainerRef}>
          {categoryList.map((category, index) => (
            <StyledButton
              key={index}
              onClick={changeSeletedCategory}
              ref={decideRef(index)}
              className={category === selectedCategory ? 'selected' : 'notSelected'}
            >
              {category}
            </StyledButton>
          ))}
          {canCreate && (
            <ArrowButton
              $background="#FFFFFF"
              $border="1px dashed #c1e2dd"
              $margin="0 10px"
            >
              {' '}
              <AiOutlinePlus />
            </ArrowButton>
          )}
        </StyledArea>
      </StyledDiv>
      {useArrow && (
        <ArrowButton onClick={scrollRight} className={lastInViewport ? 'disabled' : ''}>
          <IoIosArrowForward />
        </ArrowButton>
      )}
    </StyledWarpper>
  )
}

const StyledWarpper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
`

const StyledDiv = styled.div`
  display: flex;
  gap: 10px;
`
const StyledArea = styled.div`
  display: flex;
  gap: 10px;
  overflow: auto;
  max-width: 700px;

  // 스크롤 바 숨김
  -ms-overflow-style: none; //인터넷 익스플로러
  scrollbar-width: none; // 파이어폭스

  // 크롬, 사파리, 오페라, 엣지 스크롤바 숨김
  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledButton = styled.button`
  width: auto;
  height: 40px;
  border-radius: 100px;
  padding: 0 15px;
  cursor: pointer;
  white-space: nowrap;

  &.selected {
    background: #eaf6f4;
    color: #2b7f75;
    border: 1px solid #2b7f75;
  }

  &.notSelected {
    background: #ffffff;
    color: #303030;
    border: 1px solid #f2f2f2;
  }

  &:hover {
    transform: scale(0.95);
  }
`

export default CategorySection
