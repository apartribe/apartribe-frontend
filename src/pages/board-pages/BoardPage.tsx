import BoardListSection from 'components/community/board-page/BoardListSection'
import React, { useState } from 'react'
import { styled } from 'styled-components'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import { SORT_DROPDOWN_LIST } from 'constants/sortList'
import CategorySection from 'components/community/CategorySection'
import DropDownSort from 'components/common/DropDownSort'
import { BOARD_CATEGOTY_LIST_MOCK } from 'mock/categoryData'

const BoardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(BOARD_CATEGOTY_LIST_MOCK[0])
  const [selectedSort, setSelectedSort] = useState(SORT_DROPDOWN_LIST[0])

  return (
    <ShadowBox $display="flex" $flexDirection="column" $gap="10px">
      <StyledDiv>
        <CategorySection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categoryList={BOARD_CATEGOTY_LIST_MOCK}
          useArrow
          canCreate
        />
        <DropDownSort
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          dropdownList={SORT_DROPDOWN_LIST}
        />
      </StyledDiv>
      <BoardListSection selectedCategory={selectedCategory} selectedSort={selectedSort} />
    </ShadowBox>
  )
}

export default BoardPage

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
