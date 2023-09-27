import React, { FC } from 'react'
import { Badge, Img, P } from 'styles/reusable-style/elementStyle'
import { AiOutlineEye, AiOutlineLike } from 'react-icons/ai'
import { BiConversation } from 'react-icons/bi'
import { styled } from 'styled-components'
import { AnnouncementMockType } from 'mock/announcementData'
import { useNavigate } from 'react-router-dom'

interface Props {
  post: AnnouncementMockType
}

const badgeColor = (urgency: string): string => {
  if (urgency === '일반') return '#0B2A08'
  if (urgency === '긴급') return '#C9AB0C'
  return '#EA1616'
}

const AnnouncementCard: FC<Props> = ({
  post: { avatar, job, writer, date, urgency, title, content, view, like, comment, url },
}) => {
  const navigate = useNavigate()

  const moveToDetail = () => {
    navigate('/community/123/announcements/45/detail') // 추후 경로 수정
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
            [{job}] {writer}
          </P>
          <P $fontSize="10px" $color="#b3b3b3" $lineHeight="12px">
            {date}
          </P>
        </div>
        <StyledDiv className="row">
          <Badge $background={badgeColor(urgency)}>{urgency}</Badge>
          <StyledParagraph className="singleLineEclips">{title}</StyledParagraph>
        </StyledDiv>
        <StyledParagraph className="doubleLineEclips">{content}</StyledParagraph>
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
      </StyledDiv>
      {url ? (
        <Img
          src={url}
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

export default AnnouncementCard

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
    align-items: center;
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
