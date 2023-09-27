import React, { FC, FormEvent } from 'react'
import { styled } from 'styled-components'
import { Img, Input } from 'styles/reusable-style/elementStyle'
import CommentCard from './CommentCard'
import { DetailCommentData } from 'types/community-type/detailDataType'

const CURRENT_USER_MOCK = {
  avatar:
    'https://res.cloudinary.com/dh6tdcdyj/image/upload/v1695016765/KakaoTalk_20230918_145710613_id4fua.png',
  nickname: '화해방',
}

interface Props {
  commentCounts: number
  comments: DetailCommentData[]
}

const DetailCommentSection: FC<Props> = ({ commentCounts, comments }) => {
  const submitComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('댓글 제출')
  }

  return (
    <StyledWrapper>
      <p>댓글 {commentCounts}</p>
      <StyledDiv className="column gap">
        <StyledDiv className="row gap">
          <Img
            src={CURRENT_USER_MOCK.avatar}
            alt="로그인 회원 아바타"
            $width="50px"
            $height="50px"
          />
          <p>{CURRENT_USER_MOCK.nickname}</p>
        </StyledDiv>
        <StyledForm onSubmit={submitComment}>
          <Input type="text" placeholder="댓글을 입력하세요." />
          <StyledButton type="submit">등록</StyledButton>
        </StyledForm>
      </StyledDiv>
      <StyledDiv className="column">
        {comments &&
          comments.map((comment) => <CommentCard key={comment.id} comment={comment} />)}
      </StyledDiv>
    </StyledWrapper>
  )
}

export default DetailCommentSection

const StyledWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
`

const StyledDiv = styled.div`
  display: flex;
  &.gap {
    gap: 10px;
  }

  &.row {
    align-items: center;
  }

  &.column {
    flex-direction: column;
  }

  &.between {
    justify-content: space-between;
  }
`

const StyledForm = styled.form`
  display: flex;
  gap: 10px;
`

const StyledButton = styled.button`
  background: #ffffff;
  height: 50px;
  width: 100px;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`
