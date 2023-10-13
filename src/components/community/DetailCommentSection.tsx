import React, { FormEvent, useState, useEffect, ChangeEvent } from 'react'
import { styled } from 'styled-components'
import { Img, Input } from 'styles/reusable-style/elementStyle'
import CommentCard from './CommentCard'
import { commentsService } from 'services/community/commentsService'
import { useParams } from 'react-router-dom'
import { commentService } from 'services/community/commentService'

const CURRENT_USER_MOCK = {
  avatar:
    'https://res.cloudinary.com/dh6tdcdyj/image/upload/v1695016765/KakaoTalk_20230918_145710613_id4fua.png',
  nickname: '화해방',
}

export interface CommentsData {
  results: CommentData[]
  totalCount: number
}

export interface CommentData {
  content: string
  createdAt: string
  createdBy: string
  id: number
  like: number
  children: ReplyData[]
}

export interface ReplyData {
  content: string
  createdAt: string
  createdBy: string
  id: number
  like: number
}

const DetailCommentSection = (/* { commentCounts, comments } */) => {
  const [commentsData, setCommentsData] = useState<CommentsData | null>(null)

  const param = useParams()
  const { postId } = param

  useEffect(() => {
    const getComments = async () => {
      const response = await commentsService.getComments({
        postId: postId as string,
        page: 1,
      })
      if (!response) return
      setCommentsData(response.data)
    }

    getComments()
  }, [postId])

  //=========

  const [inputValue, setInputValue] = useState('')

  const changeInputValuse = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const submitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    /*   const response =  */ await commentService.addComment({
      postId: postId as string,
      content: inputValue,
    })
    // const newComment = response?.data; // 지금은 undefined임. 서버에서 수정해주면 들어 올 예정
    // if(newComment){
    //   const {content, createdAt, createdBy, id, liked, children } = newComment;
    //     setCommentsData(( prevState ) => ({...prevState, results : [{content, createdAt, createdBy, id, liked, children}, ...prevState?.results]}))
    // }
    alert('댓글 등록 완료 (추후 이 팝업 삭제 요망)')
    setInputValue('')
  }

  if (!commentsData) return <p></p>

  const { totalCount, results: comments } = commentsData

  return (
    <StyledWrapper>
      <p>댓글 {totalCount}</p>
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
          <Input
            type="text"
            placeholder="댓글을 입력하세요."
            value={inputValue}
            onChange={changeInputValuse}
          />
          <StyledButton type="submit">등록</StyledButton>
        </StyledForm>
      </StyledDiv>
      <StyledDiv className="column">
        {comments &&
          comments.map((comment) => (
            <CommentCard key={comment.id} postId={postId as string} comment={comment} />
          ))}
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
