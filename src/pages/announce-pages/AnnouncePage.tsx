import React, { useState } from 'react'
import PostListSection from 'components/community/common/PostListSection'
import DropdownSort from 'components/ui/DropdownSort'
import { styled } from 'styled-components'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import CategorySection from 'components/community/common/CategorySection'

const AnnouncePage = () => {
  const BOARD_TYPE = 'announce'
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [selectedSort, setSelectedSort] = useState({
    title: '최신순',
    value: 'createdAt',
    order: 'desc',
  })

  return (
    <ShadowBox $display="flex" $flexDirection="column" $gap="10px">
      <StyledDiv>
        <CategorySection
          boardType={BOARD_TYPE}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <DropdownSort selectedValue={selectedSort} setSelectedValue={setSelectedSort} />
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
