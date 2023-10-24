import React, { useState } from 'react'
import { styled } from 'styled-components'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import CategorySection from 'components/community/common/CategorySection'
import DropdownSort from 'components/ui/DropdownSort'
import PostListSection from 'components/community/common/PostListSection'

const TogetherPage = () => {
  const BOARD_TYPE = 'together'
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [selectedSort, setSelectedSort] = useState({
    title: '최신순',
    value: 'createdAt',
    order: 'desc',
  })

  return (
    <>
      <ShadowBox $overflow="visible">
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
      </ShadowBox>
      <StyledDiv className="wrap">
        <PostListSection
          boardType={BOARD_TYPE}
          selectedCategory={selectedCategory}
          selectedSort={selectedSort}
        />
      </StyledDiv>
    </>
  )
}

export default TogetherPage

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;

  &.wrap {
    flex-wrap: wrap;
  }
`
