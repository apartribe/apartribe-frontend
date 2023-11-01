import WidgetTitleArea from 'components/community/widget-bar/WidgetTitleArea'
import React, { useState, useEffect } from 'react'
import { Img, P, ShadowBox } from 'styles/reusable-style/elementStyle'
import { FaRankingStar } from 'react-icons/fa6'
import { styled } from 'styled-components'
import { FaTrophy } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { widgetService } from 'services/community/widgetSevice'
import dafaultAvatar from 'assets/users/defaultAvatar.png'

const CommentRankWidget = () => {
  const { aptId } = useParams()

  const [rankList, setRankList] = useState([])

  useEffect(() => {
    const getCommentRank = async () => {
      const response = await widgetService.getCommentRank({ aptId: aptId as string })
      setRankList(response.data)
    }

    getCommentRank()
  }, [])

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
      {rankList.length === 0 ? (
        <StyledParagraph className="noData">
          {' '}
          댓글을 남긴 사용자가 없습니다.
        </StyledParagraph>
      ) : (
        <>
          {rankList.map(({ id, nickname, commentCount }, index) => (
            <StyledWrapper key={nickname}>
              <StyledDiv className="rank">{decideIcon(index)}</StyledDiv>
              <Img src={dafaultAvatar} $width="40px" $height="40px" />
              <StyledDiv>
                <P $fontWeight="700" $lineHeight="25px">
                  {nickname}
                </P>
                <P $fontSize="11px" $lineHeight="15px">
                  댓글 {commentCount}개
                </P>
              </StyledDiv>
            </StyledWrapper>
          ))}
        </>
      )}
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

const StyledParagraph = styled.div`
  &.noData {
    border-top: none;
    line-height: 20px;
    font-size: 12px;
    padding-left: 25px;
  }
`
