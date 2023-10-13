import React, { FC } from 'react'
import { styled } from 'styled-components'
import { timeAgo } from 'utils/timeAgo'
import {
  AiOutlineEye,
  AiOutlineLike,
  AiOutlineEdit,
  AiOutlineDelete,
} from 'react-icons/ai'
import { BiConversation, BiShareAlt } from 'react-icons/bi'
// import { Img } from 'styles/reusable-style/elementStyle'
import { useNavigate } from 'react-router-dom'
import { BoardPostData } from 'pages/board-pages/DetailBoardPage'
import { postService } from 'services/community/postService'
import { BoardType } from 'services/community/postsService'

interface Props {
  postId: string
  boardType: BoardType
  postData: BoardPostData
}

const DetailHeaderSection: FC<Props> = ({
  boardType,
  postId,
  postData: {
    issuedAt,
    data: { /* category, avatar, job, createdBy, */ title, liked, saw, commentCounts },
  },
}) => {
  const navigate = useNavigate()

  const isCommunity = /article/
  const isAnnouncement = /announce/
  const isGatherPeople = /together/

  const decidePath = () => {
    if (isCommunity.test(boardType)) return '커뮤니티 홈'
    if (isAnnouncement.test(boardType)) return '아파트 공지사항'
    if (isGatherPeople.test(boardType)) return '같이 하실 분'
    return
  }

  const moveToEditPage = () => {
    navigate(`/community/123/${boardType}/${postId}/edit`)
  }

  const deletePost = async () => {
    const userConfirmed = confirm(
      '정말 삭제 하시겠습니까? 삭제 후에는 복구할 수 없습니다.',
    )
    if (userConfirmed) {
      const { statusCode, message } = await postService.deletePost({ boardType, postId })
      if (statusCode === 204) {
        alert(message)
        navigate(`/community/123`)
        return
      }
      alert(message)
      return
    }
  }

  return (
    <StyledWrapper>
      <StyledDiv className="between">
        <StyledParagraph className="md">
          {decidePath()} &nbsp;&gt;&nbsp; *카테고리 정보 필요* {/* {category} */}
        </StyledParagraph>
        <StyledDiv>
          <StyledButton onClick={moveToEditPage}>
            <AiOutlineEdit />
            &nbsp; 수정
          </StyledButton>
          <StyledButton onClick={deletePost}>
            <AiOutlineDelete />
            &nbsp; 삭제
          </StyledButton>
        </StyledDiv>
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
        {/* <Img src={avatar} alt="아바타" $width="50px" $height="50px" />
        {job ? (
          <p>
            [{job}] {createdBy}
          </p>
        ) : (
          <p>{createdBy}</p>
        )} */}
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
