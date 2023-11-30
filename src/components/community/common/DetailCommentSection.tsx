import React, { FormEvent, useState, useEffect, ChangeEvent } from 'react'
import { styled } from 'styled-components'
import { Img, Input } from 'styles/reusable-style/elementStyle'
import CommentCard from './CommentCard'
import { useParams } from 'react-router-dom'
import { commentService } from 'services/community/commentService'
import { MoonLoader } from 'react-spinners'
import { Comment } from 'types/community-type/commentType'
import defaultAvatar from 'assets/users/defaultAvatar.png'
import { toast } from 'react-toastify'
import { useAppSelector } from 'hooks/useRedux'

const DetailCommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [commentCount, setCommentsCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const userInfo = useAppSelector((state) => state.user.userInfo)
  const notVerifiedUser = userInfo.apartCode === 'EMPTY' ? true : false

  const param = useParams()
  const { aptId, postId } = param

  const [inputValue, setInputValue] = useState('')

  const changeInputValuse = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const submitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue) return toast.warn('댓글 내용을 입력해주세요.')
    const response = await commentService.addComment({
      aptId: aptId as string,
      postId: postId as string,
      content: inputValue,
    })
    const newComment: Comment = response?.data

    if (newComment) {
      const { content, createdAt, createdBy, commentId, profileImage } = newComment
      setComments((prevState) => [
        {
          childCounts: 0,
          commentId,
          content,
          createdAt,
          createdBy,
          liked: 0,
          memberCreated: true,
          memberLiked: false,
          profileImage,
          children: [],
        },
        ...prevState,
      ])
      toast.success('댓글이 등록 되었습니다.')
      setInputValue('')
    }
  }

  useEffect(() => {
    const getComments = async () => {
      setLoading(true)
      const response = await commentService.getComments({
        aptId: aptId as string,
        postId: postId as string,
      })
      setComments(response)
      setLoading(false)
    }

    const getCommentCount = async () => {
      const response = await commentService.getCommentCount({
        aptId: aptId as string,
        postId: postId as string,
      })
      setCommentsCount(response.data.commentCount)
    }

    getComments()
    getCommentCount()
  }, [aptId, postId])

  if (!comments) return <p></p>

  return (
    <StyledWrapper>
      <p>댓글 {commentCount}</p>
      <StyledDiv className="column gap">
        <StyledDiv className="row gap">
          <Img
            src={userInfo?.profileImageUrl || defaultAvatar}
            alt="로그인 회원 아바타"
            $width="50px"
            $height="50px"
            $borderRadius="50%"
          />
          <p>{userInfo?.nickname}</p>
        </StyledDiv>
        <StyledForm onSubmit={submitComment}>
          <Input
            type="text"
            placeholder={
              notVerifiedUser
                ? '본인 아파트 인증 후 이용 가능합니다.'
                : '댓글을 입력하세요.'
            }
            value={inputValue}
            onChange={changeInputValuse}
            disabled={notVerifiedUser}
          />
          <StyledButton type="submit">등록</StyledButton>
        </StyledForm>
      </StyledDiv>
      <StyledDiv className="column">
        {comments &&
          comments.map((comment: Comment) => (
            <CommentCard
              key={comment.commentId}
              comment={comment}
              setComments={setComments}
            />
          ))}
      </StyledDiv>
      {loading && (
        <MoonLoader color="#36d7b7" size="40px" cssOverride={{ margin: '10px auto' }} />
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
