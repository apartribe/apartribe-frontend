import React, { useState } from 'react'
import { styled } from 'styled-components'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import { SORT_DROPDOWN_LIST } from 'constants/sortList'
import CategorySection from 'components/community/CategorySection'
import { GATHER_PEOPLE_CATEGOTY_LIST_MOCK } from 'mock/categoryData'
import GatherPeopleListSection from 'components/community/gather-people-page/GatherPeopleListSection'
import DropdownSort from 'components/ui/DropdownSort'

const GatherPeoplePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    GATHER_PEOPLE_CATEGOTY_LIST_MOCK[0],
  )
  const [selectedSort, setSelectedSort] = useState(SORT_DROPDOWN_LIST[0])

  return (
    <>
      <ShadowBox>
        <StyledDiv>
          <CategorySection
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categoryList={GATHER_PEOPLE_CATEGOTY_LIST_MOCK}
            useArrow
            canCreate
          />
          <DropdownSort
            selectedValue={selectedSort}
            setSelectedValue={setSelectedSort}
            dropdownList={SORT_DROPDOWN_LIST}
          />
        </StyledDiv>
      </ShadowBox>
      <StyledDiv className="wrap">
        <GatherPeopleListSection
          selectedCategory={selectedCategory}
          selectedSort={selectedSort}
        />
      </StyledDiv>
    </>
  )
}

export default GatherPeoplePage

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;

  &.wrap {
    flex-wrap: wrap;
  }
`
