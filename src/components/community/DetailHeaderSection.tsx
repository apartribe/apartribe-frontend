import React, { FC } from 'react'
import { styled } from 'styled-components'
import { timeAgo } from 'utils/timeAgo'
import { RiFileListLine } from 'react-icons/ri'
import { AiOutlineEye, AiOutlineLike } from 'react-icons/ai'
import { BiConversation , BiShareAlt } from 'react-icons/bi'

import { Img } from 'styles/reusable-style/elementStyle'
import { useLocation } from 'react-router-dom'

interface DetailHeaderData {
  avatar: string
  category: string
  createdBy: string
  title: string
  liked: number
  saw: number
  commentCounts: number
  job?: string
}

interface Props {
  issuedAt: string
  data: DetailHeaderData
}

const DetailHeaderSection: FC<Props> = ({
  issuedAt,
  data: { category, avatar, job, createdBy, title, liked, saw, commentCounts },
}) => {
  const location = useLocation()
  const currentPath = location.pathname

  const isCommunity = /(bbs)/
  const isAnnouncement = /(announcements)/
  const isGatherPeople = /(gather-people)/

  const decidePath = () => {
    if (isCommunity.test(currentPath)) return '커뮤니티 홈'
    if (isAnnouncement.test(currentPath)) return '아파트 공지사항'
    if (isGatherPeople.test(currentPath)) return '같이 하실 분'
    return
  }

  return (
    <StyledWrapper>
      <StyledDiv className="between">
        <StyledParagraph className="md">
          {decidePath()} &nbsp;&gt;&nbsp; {category}
        </StyledParagraph>
        <RiFileListLine fontSize="30px" />
      </StyledDiv>
      <StyledDiv>
        <StyledParagraph className="xl">{title}</StyledParagraph>
      </StyledDiv>
      <StyledDiv className="between">
        <StyledDiv>
          <StyledParagraph className="md">{timeAgo(issuedAt)}</StyledParagraph>
          <StyledParagraph className="sm">
            <AiOutlineEye />
            {saw}
          </StyledParagraph>
          <StyledParagraph className="sm">
            <AiOutlineLike />
            {liked}
          </StyledParagraph>
          <StyledParagraph className="sm">
            <BiConversation />
            {commentCounts}
          </StyledParagraph>
        </StyledDiv>
        <StyledDiv>
          <StyledButton>
            <AiOutlineLike />
            &nbsp; 좋아요
          </StyledButton>
          <StyledButton>
            <BiShareAlt />
            &nbsp; 공유
          </StyledButton>
        </StyledDiv>
      </StyledDiv>
      <StyledDiv>
        <Img src={avatar} alt="아바타" $width="50px" $height="50px" />
        {job ? (
          <p>
            [{job}] {createdBy}
          </p>
        ) : (
          <p>{createdBy}</p>
        )}
      </StyledDiv>
    </StyledWrapper>
  )
}

export default DetailHeaderSection

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  &.between {
    justify-content: space-between;
  }
`

const StyledParagraph = styled.p`
  margin: 0;

  &.sm {
    font-size: 12px;
    display: flex;
    gap: 5px;
    align-items: center;
  }

  &.md {
    font-size: 15px;
    font-weight: 700;
  }

  &.lg {
    font-size: 20px;
  }

  &.xl {
    font-size: 30px;
    font-weight: 900;
  }
`

const StyledButton = styled.button`
  background: #ffffff;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`
