import CategoryBar from 'components/community/CategorySection'
import ListSection from 'components/community/ListSection'
import React, { useState } from 'react'
import { styled } from 'styled-components'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import { BOARD_SORT_DROPDOWN_LIST } from 'constants/sortList'
import CategorySection from 'components/community/CategorySection'
import DropDownSort from 'components/common/DropDownSort'
import { CATEGOTY_LIST_MOCK } from 'mock/categoryData'

const BoardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGOTY_LIST_MOCK[0])
  const [selectedSort, setSelectedSort] = useState(BOARD_SORT_DROPDOWN_LIST[0])

  return (
    <ShadowBox>
      <StyledDiv>
        <CategorySection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categoryList={CATEGOTY_LIST_MOCK}
        />
        <DropDownSort
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          dropdownList={BOARD_SORT_DROPDOWN_LIST}
        />
      </StyledDiv>
      <ListSection />
    </ShadowBox>
  )
}

export default BoardPage

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
