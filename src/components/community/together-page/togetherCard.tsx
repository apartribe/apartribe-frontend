import React, { FC } from 'react'
import { Badge, P } from 'styles/reusable-style/elementStyle'
import { styled } from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { TogetherCardType } from 'types/community-type/togetherType'
import { BoardType } from 'services/community/postsService'
import { timeAgo } from 'utils/timeAgo'

interface Props {
  boardType: BoardType
  post: TogetherCardType
}

const TogetherCard: FC<Props> = ({
  post: {
    id,
    createdBy,
    createdAt,
    recruitStatus,
    title,
    description,
    /* saw, liked, commentCounts, */ thumbnail,
  },
}) => {
  const navigate = useNavigate()
  const { aptId } = useParams()

  const moveToDetail = () => {
    navigate(`/community/${aptId}/together/${id}/detail`) // 추후 경로 수정
  }

  const badgeColor = (urgency: string): string => {
    if (urgency === '모집중') return '#E18745'
    return '#303030'
  }

  return (
    <StyledBox onClick={moveToDetail}>
      <Badge
        $position="absolute"
        $top="10px"
        $right="10px"
        $background={badgeColor(recruitStatus)}
      >
        {recruitStatus}
      </Badge>
      {/* {url ? <Img src={url} $width="150px" $height="130spx" $borderRadius="5px" /> : ''}*/}
      <StyledImgWrapper>
        <StyledImg src={thumbnail} alt="썸네일" />
      </StyledImgWrapper>
      <StyledDiv className="column">
        <StyledParagraph className="singleLineEclips">{title}</StyledParagraph>
        <P $fontSize="12px" $lineHeight="20px" $fontWeight="700">
          {createdBy}
        </P>
        <P $fontSize="10px" $color="#b3b3b3" $lineHeight="10px">
          {timeAgo(createdAt)}
        </P>
        {/* 추후 필요시 사용 */}
        {/* <StyledDiv className="row">
          <P $fontSize="12px">
            <AiOutlineEye />
            &nbsp;{saw}
          </P>
          <P $fontSize="12px">
            <AiOutlineLike />
            &nbsp;{liked}
          </P>
          <P $fontSize="12px">
            <BiConversation />
            &nbsp;{commentCounts}
          </P>
        </StyledDiv> */}
        <StyledParagraph className="doubleLineEclips">{description}</StyledParagraph>
      </StyledDiv>
    </StyledBox>
  )
}

export default TogetherCard

const StyledBox = styled.div`
  background: #ffffff;
  position: relative;
  width: 435px;
  height: 150px;
  margin: 10px 5px 0 5px;
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
      transform: scale(1.05);
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
    margin: 15px 0 0 0;
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
