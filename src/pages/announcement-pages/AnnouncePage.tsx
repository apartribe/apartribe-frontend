import React, { useState } from 'react'
import PostListSection from 'components/community/board-page/PostListSection'
import DropdownSort from 'components/ui/DropdownSort'
import { SORT_DROPDOWN_LIST } from 'constants/sortList'
import { styled } from 'styled-components'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import CategorySection from 'components/community/CategorySection'

const AnnouncePage = () => {
  const BOARD_TYPE = 'announce'
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [selectedSort, setSelectedSort] = useState('최신순')

  return (
    <ShadowBox $display="flex" $flexDirection="column" $gap="10px">
      <StyledDiv>
        <CategorySection
          boardType={BOARD_TYPE}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <DropdownSort
          selectedValue={selectedSort}
          setSelectedValue={setSelectedSort}
          dropdownList={SORT_DROPDOWN_LIST}
        />
      </StyledDiv>
      <PostListSection
        boardType={BOARD_TYPE}
        selectedCategory={selectedCategory}
        selectedSort={selectedSort}
      />
    </ShadowBox>
  )
}

export default AnnouncePage

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
