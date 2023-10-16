import WidgetTitleArea from 'components/community/widget-bar/WidgetTitleArea'
import React from 'react'
import { Img, P, ShadowBox } from 'styles/reusable-style/elementStyle'
import { FaRankingStar } from 'react-icons/fa6'
import { COMMENT_RANK_MOCK } from 'mock/commentRankData'
import { styled } from 'styled-components'
import { FaTrophy } from 'react-icons/fa'

const CommentRankWidget = () => {
  const decideIcon = (index: number) => {
    if (index === 0) return <FaTrophy color="#D5A11E" />
    if (index === 1) return <FaTrophy color="#A3A3A3" />
    if (index === 2) return <FaTrophy color="#CD7F32" />
    return index + 1
  }

  return (
    <ShadowBox>
      <WidgetTitleArea
        Icon={FaRankingStar}
        title="지난 주 댓글 랭킹"
        hasSeeMore={false}
      />
      {COMMENT_RANK_MOCK.data.map((item, index) => (
        <StyledWrapper key={item.nickname}>
          <StyledDiv className="rank">{decideIcon(index)}</StyledDiv>
          <Img src={item.avatar} $width="40px" $height="40px" />
          <StyledDiv>
            <P $fontWeight="700" $lineHeight="25px">
              {item.nickname}
            </P>
            <P $fontSize="11px" $lineHeight="15px">
              댓글 {item.commentCount}개
            </P>
          </StyledDiv>
        </StyledWrapper>
      ))}
    </ShadowBox>
  )
}

export default CommentRankWidget

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 5px 10px;
`

const StyledDiv = styled.div`
  &.rank {
    width: 20px;
    font-weight: 700;
    color: #303030;
  }
`
