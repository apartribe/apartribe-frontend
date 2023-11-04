import React, { Dispatch, FC, MouseEvent, useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { ArrowButton } from 'styles/reusable-style/elementStyle'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { AiOutlinePlus } from 'react-icons/ai'
import { useInView } from 'react-intersection-observer'
import { useScrollButton } from 'hooks/useScrollButton'
import AddCategoryModal from './AddCategoryModal'
import { categoryService } from 'services/community/categoryService'
import { BoardType } from 'services/community/postsService'
import { Category } from 'types/community-type/categoryType'
import { useParams } from 'react-router-dom'

interface Props {
  boardType: BoardType
  selectedCategory: string
  setSelectedCategory: Dispatch<React.SetStateAction<string>>
  useArrow?: boolean
  canCreate?: boolean
}

const CategorySection: FC<Props> = ({
  boardType,
  selectedCategory,
  setSelectedCategory,
  useArrow = false,
  canCreate = false,
}) => {
  const { aptId } = useParams()
  const [categoryList, setCategoryList] = useState<string[]>([])

  useEffect(() => {
    const getCategory = async () => {
      const response = await categoryService.getCategory({
        aptId: aptId as string,
        boardType,
      })
      const mappedResponse = response.data.map((item: Category) => item.categoryName)
      setCategoryList(['전체', ...mappedResponse])
    }

    getCategory()
  }, [boardType, aptId])

  //=======

  const { ref: firstCategoryRef, inView: firstInViewport } = useInView({
    threshold: 1,
  })
  const { ref: lastCategoryRef, inView: lastInViewport } = useInView({
    threshold: 1,
  })

  const [scrollContainerRef, scrollRight, scrollLeft] = useScrollButton()

  const changeSeletedCategory = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(e.currentTarget.innerText)
  }

  const [addModalVisible, setAddModalVisible] = useState(false)

  return (
    <StyledWarpper>
      <StyledDiv>
        {useArrow && (
          <ArrowButton onClick={scrollLeft} className={firstInViewport ? 'disabled' : ''}>
            <IoIosArrowBack />
          </ArrowButton>
        )}
        <StyledArea ref={scrollContainerRef}>
          {categoryList?.map((category: string, index: number) => (
            <StyledButton
              key={index}
              onClick={changeSeletedCategory}
              ref={index === 0 ? firstCategoryRef : null}
              className={category === selectedCategory ? 'selected' : 'notSelected'}
            >
              {category}
            </StyledButton>
          ))}
          {canCreate && (
            <ArrowButton
              onClick={() => setAddModalVisible(true)}
              ref={lastCategoryRef}
              $background="#FFFFFF"
              $border="1px dashed #c1e2dd"
              $margin="0 10px"
            >
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
      {addModalVisible ? (
        <AddCategoryModal
          boardType={boardType}
          setAddModalVisible={setAddModalVisible}
          setCategoryList={setCategoryList}
        />
      ) : (
        ''
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
  max-width: 650px;

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
