import React, { useState } from 'react'
import PostListSection from 'components/community/board-page/PostListSection'
// import CategorySection from 'components/community/CategorySection'
// import AnnouncementListSection from 'components/community/announce-page/AnnouncementListSection'
import DropdownSort from 'components/ui/DropdownSort'
import { SORT_DROPDOWN_LIST } from 'constants/sortList'
import { ANNOUNCE_CATEGOTY_LIST_MOCK } from 'mock/categoryData'
import { styled } from 'styled-components'
import { ShadowBox } from 'styles/reusable-style/elementStyle'

const AnnouncePage = () => {
  const BOARD_TYPE = 'announce'
  const [selectedCategory, setSelectedCategory] = useState(ANNOUNCE_CATEGOTY_LIST_MOCK[0])
  const [selectedSort, setSelectedSort] = useState(SORT_DROPDOWN_LIST[0])

  return (
    <ShadowBox $display="flex" $flexDirection="column" $gap="10px">
      <StyledDiv>
        {/* <CategorySection
          boardType={BOARD_TYPE}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        /> */}
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
