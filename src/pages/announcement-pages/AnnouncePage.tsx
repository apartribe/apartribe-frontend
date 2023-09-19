import DropDownSort from 'components/common/DropDownSort'
import CategorySection from 'components/community/CategorySection'
import AnnouncementListSection from 'components/community/announce-page/AnnouncementListSection'
import { SORT_DROPDOWN_LIST } from 'constants/sortList'
import { ANNOUNCE_CATEGOTY_LIST_MOCK } from 'mock/categoryData'
import React, { useState } from 'react'
import { styled } from 'styled-components'
import { ShadowBox } from 'styles/reusable-style/elementStyle'

const AnnouncePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(ANNOUNCE_CATEGOTY_LIST_MOCK[0])
  const [selectedSort, setSelectedSort] = useState(SORT_DROPDOWN_LIST[0])

  return (
    <ShadowBox $display="flex" $flexDirection="column" $gap="10px">
      <StyledDiv>
        <CategorySection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categoryList={ANNOUNCE_CATEGOTY_LIST_MOCK}
        />
        <DropDownSort
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          dropdownList={SORT_DROPDOWN_LIST}
        />
      </StyledDiv>
      <AnnouncementListSection
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
