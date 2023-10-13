import { BoardMockType } from 'mock/boardData'
import React, { FC } from 'react'
import { Img, P } from 'styles/reusable-style/elementStyle'
import { AiOutlineEye, AiOutlineLike } from 'react-icons/ai'
// import { BiConversation } from 'react-icons/bi'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { timeAgo } from 'utils/timeAgo'
import { BoardType } from 'services/community/postsService'

interface Props {
  boardType: BoardType
  post: BoardMockType
}

const BoardCard: FC<Props> = ({
  boardType,
  post: {
    id,
    avatar,
    createdBy,
    createdAt,
    title,
    content,
    saw,
    liked,
    /* commentCount, */ thumbnail,
  },
}) => {
  const navigate = useNavigate()

  const moveToDetail = () => {
    navigate(`/community/123/${boardType}/${id}/detail`) // TODO: 아파트 아이디 변경
  }

  return (
    <StyledWrapper className="flex" onClick={moveToDetail}>
      <Img
        src={avatar}
        $width="40px"
        $height="40px"
        $borderRadius="50%"
        $lineHeight="12px"
        $margin="5px 0"
      />
      <StyledDiv className="column">
        <div>
          <P $fontSize="12px" $fontWeight="700">
            {createdBy}
          </P>
          <P $fontSize="10px" $color="#b3b3b3" $lineHeight="12px">
            {timeAgo(createdAt)}
          </P>
        </div>
        <StyledParagraph className="singleLineEclips">{title}</StyledParagraph>
        <StyledParagraph className="doubleLineEclips">{content}</StyledParagraph>
        <StyledDiv className="row">
          <P $fontSize="12px">
            <AiOutlineEye />
            &nbsp;{saw}
          </P>
          <P $fontSize="12px">
            <AiOutlineLike />
            &nbsp;{liked}
          </P>
          {/* <P $fontSize="12px">
            <BiConversation />
            &nbsp;{comment}
          </P> */}
        </StyledDiv>
      </StyledDiv>
      {thumbnail ? (
        <Img
          src={thumbnail}
          $width="150px"
          $height="80px"
          $borderRadius="5px"
          $margin="45px 0"
        />
      ) : (
        ''
      )}
    </StyledWrapper>
  )
}

export default BoardCard

const StyledWrapper = styled.div`
  max-width: 900px;
  height: 170px;
  display: flex;
  border-top: 1px solid #f2f2f2;
  padding: 10px 20px;
  gap: 20px;
  cursor: pointer;
`

const StyledDiv = styled.div`
  &.row {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }

  &.column {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`

const StyledParagraph = styled.p`
  &.singleLineEclips {
    margin: 0;
    font-size: 20px;
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
