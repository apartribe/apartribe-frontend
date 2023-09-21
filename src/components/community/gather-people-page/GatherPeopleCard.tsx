import React, { FC } from 'react'
import { Badge, Img, P, ShadowBox } from 'styles/reusable-style/elementStyle'
import { AiOutlineEye, AiOutlineLike } from 'react-icons/ai'
import { BiConversation } from 'react-icons/bi'
import { styled } from 'styled-components'
import { GatherPeopleMockType } from 'mock/gatherPeopleData'
import { useNavigate } from 'react-router-dom'

interface Props {
  post: GatherPeopleMockType
}

const badgeColor = (urgency: string): string => {
  if (urgency === '모집 중') return '#E18745'
  return '#303030'
}

const GatherPeopleCard: FC<Props> = ({
  post: { writer, date, state, title, explain, view, like, comment, url },
}) => {
  const navigate = useNavigate()

  const moveToDetail = () => {
    navigate('/community/123/gather-people/45/detail') // 추후 경로 수정
  }
  return (
    <StyledBox onClick={moveToDetail}>
      <Badge
        $position="absolute"
        $top="10px"
        $right="10px"
        $background={badgeColor(state)}
      >
        {state}
      </Badge>
      {/* {url ? <Img src={url} $width="150px" $height="130spx" $borderRadius="5px" /> : ''}*/}
      <StyledImgWrapper>
        <StyledImg src={url} alt="" />
      </StyledImgWrapper>
      <StyledDiv className="column">
        <StyledParagraph className="singleLineEclips">{title}</StyledParagraph>
        <P $fontSize="12px" $lineHeight="20px" $fontWeight="700">
          {writer}
        </P>
        <P $fontSize="10px" $color="#b3b3b3" $lineHeight="10px">
          {date}
        </P>
        <StyledDiv className="row">
          <P $fontSize="12px">
            <AiOutlineEye />
            &nbsp;{view}
          </P>
          <P $fontSize="12px">
            <AiOutlineLike />
            &nbsp;{like}
          </P>
          <P $fontSize="12px">
            <BiConversation />
            &nbsp;{comment}
          </P>
        </StyledDiv>
        <StyledParagraph className="doubleLineEclips">{explain}</StyledParagraph>
      </StyledDiv>
    </StyledBox>
  )
}

export default GatherPeopleCard

const StyledBox = styled.div`
  background: #ffffff;
  position: relative;
  width: 440px;
  height: 150px;
  margin: 10px 0 0 0;
  padding: 10px;
  display: flex;
  gap: 20px;
  box-sizing: border-box;
  box-shadow: 5px 5px 4px -1px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: #303030;
  cursor: pointer;

  &:hover {
    img {
      transform: scale(1.1);
      transition: 0.1s ease-in-out;
    }
  }
`

const StyledDiv = styled.div`
  &.row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }

  &.column {
    display: flex;
    flex-direction: column;
    /* gap: 10px; */
  }
`

const StyledParagraph = styled.p`
  &.singleLineEclips {
    margin: 0;
    font-size: 20px;
    line-height: 30px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    font-size: 17px;
    font-weight: 700;
  }

  &.doubleLineEclips {
    margin: 0;
    font-size: 12px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
`
const StyledImgWrapper = styled.div`
  min-width: 150px;
  min-height: 130px;
  border-radius: 5px;
  overflow: hidden;
`

const StyledImg = styled.img`
  width: 150px;
  height: 150px;
`
