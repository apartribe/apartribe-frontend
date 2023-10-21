import React, { FormEvent, useState, useEffect, ChangeEvent, useRef } from 'react'
import { styled } from 'styled-components'
import { Img, Input } from 'styles/reusable-style/elementStyle'
import CommentCard from './CommentCard'
import { commentsService } from 'services/community/commentsService'
import { useParams } from 'react-router-dom'
import { commentService } from 'services/community/commentService'
import { MoonLoader } from 'react-spinners'
import { Comment } from 'types/community-type/commentType'
import dafaultAvatar from 'assets/users/defaultAvatar.png'

const CURRENT_USER_MOCK = {
  avatar:
    'https://res.cloudinary.com/dh6tdcdyj/image/upload/v1695016765/KakaoTalk_20230918_145710613_id4fua.png',
  nickname: '화해방',
}

const DetailCommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [commentCount, setCommentsCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [nothingToload, setNothingToload] = useState(false)
  const LoadingTargetRef = useRef(null)
  const pageCountRef = useRef(0)

  const param = useParams()
  const { aptId, postId } = param

  const [inputValue, setInputValue] = useState('')

  const changeInputValuse = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const submitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await commentService.addComment({
      aptId: aptId as string,
      postId: postId as string,
      content: inputValue,
    })
    const newComment: Comment = response?.data

    if (newComment) {
      const { content, createdAt, createdBy, id } = newComment
      setComments((prevState) => [
        { content, createdAt, createdBy, id, like: 0, children: [] },
        ...prevState,
      ])
    }
    setInputValue('')
  }

  // 무한 스크롤 ======추후 커스텀 훅으로 모듈화 고려
  useEffect(() => {
    const getNewPage = async () => {
      setLoading(true)
      pageCountRef.current = pageCountRef.current + 1
      const response = await commentsService.getComments({
        postId: postId as string,
        page: pageCountRef.current,
      })
      if (!response) return
      setCommentsCount(response.totalCount)
      if (response.results.length === 0) return setNothingToload(true)
      setLoading(false)
      setComments((prev) => [...prev, ...response.results])
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    }

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !loading) {
          getNewPage()
        }
      })
    }

    const observer = new IntersectionObserver(callback, options)
    if (LoadingTargetRef.current) {
      observer.observe(LoadingTargetRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [loading, postId])
  //======

  if (!comments) return <p></p>

  return (
    <StyledWrapper>
      <p>댓글 {commentCount}</p>
      <StyledDiv className="column gap">
        <StyledDiv className="row gap">
          <Img
            src={dafaultAvatar} //{ avater || dafaultAvatar}
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
          comments.map((comment: Comment) => (
            <CommentCard
              key={comment.id}
              aptId={aptId as string}
              postId={postId as string}
              comment={comment}
              setComments={setComments}
            />
          ))}
      </StyledDiv>
      {nothingToload ? (
        <StyledParagraph>더이상 불러 올 댓글이 없습니다.</StyledParagraph>
      ) : (
        <div ref={LoadingTargetRef}>
          {loading && (
            <MoonLoader
              color="#36d7b7"
              size="40px"
              cssOverride={{ margin: '10px auto' }}
            />
          )}
        </div>
      )}
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
const StyledParagraph = styled.p`
  text-align: center;
`