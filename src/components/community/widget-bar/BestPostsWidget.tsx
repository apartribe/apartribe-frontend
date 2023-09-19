import WidgetTitleArea from 'components/common/WidgetTitleArea'
import React from 'react'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import { FaRankingStar } from 'react-icons/fa6'
import { styled } from 'styled-components'
import { BEST_POST_MOCK } from 'mock/bestPostData'

const BestPostsWidget = () => {
  return (
    <ShadowBox>
      <WidgetTitleArea Icon={FaRankingStar} title="베스트 게시물" hasSeeMore={false} />
      {BEST_POST_MOCK.data.map((item) => (
        <StyledParagraph key={item.id}>{item.title}</StyledParagraph>
      ))}
    </ShadowBox>
  )
}

export default BestPostsWidget

const StyledParagraph = styled.div`
  margin: 0 5px;
  border-top: 1px solid #f2f2f2;
  line-height: 35px;
  font-size: 13px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  cursor: pointer;
`
