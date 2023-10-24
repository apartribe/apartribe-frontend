import PostListSection from 'components/community/common/PostListSection'
import React, { useState } from 'react'
import { styled } from 'styled-components'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import CategorySection from 'components/community/common/CategorySection'
import DropdownSort from 'components/ui/DropdownSort'

const ArticlePage = () => {
  const BOARD_TYPE = 'article'
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
          useArrow
          canCreate
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

export default ArticlePage

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
