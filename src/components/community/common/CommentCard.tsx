import React, {
  FC,
  FormEvent,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react'
import { styled } from 'styled-components'
import { /* Img, */ Img, Input } from 'styles/reusable-style/elementStyle'
import { timeAgo } from 'utils/timeAgo'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import ReplyCard from './ReplyCard'
import { commentService } from 'services/community/commentService'
import EditComment from './EditComment'
import { Comment, Reply } from 'types/community-type/commentType'
import defaultAvatar from 'assets/users/defaultAvatar.png'
import { useParams } from 'react-router-dom'
import { likeService } from 'services/community/likeService'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAppSelector } from 'hooks/useRedux'

interface Props {
  comment: Comment
  setComments: Dispatch<SetStateAction<Comment[]>>
}

const CommentCard: FC<Props> = ({
  comment: {
    childCounts,
    commentId,
    content,
    createdAt,
    createdBy,
    liked,
    memberCreated,
    memberLiked,
    profileImage,
    children: replies,
  },
  setComments,
}) => {
  const { aptId, postId } = useParams()

  const userInfo = useAppSelector((state) => state.user.userInfo)
  const notVerifiedUser = userInfo.apartCode === 'EMPTY' ? true : false

  const [repliseVisible, setRepliseVisible] = useState(false)
  const [like, setLike] = useState(memberLiked)
  const [inputValue, setInputValue] = useState('')
  const [editMode, setEditMode] = useState(false)

  const changeInputValuse = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const toggleLike = async () => {
    const response = await likeService.commentLike({
      aptId: aptId as string,
      postId: postId as string,
      commentId,
    })
    setLike(response.data.liked)
    const newMemberLiked: boolean = response.data.liked
    setComments((prevState) => {
      const result = prevState.map((item) => {
        if (item.commentId === commentId) {
          return { ...item, liked: newMemberLiked ? item.liked + 1 : item.liked - 1 }
        } else {
          return item
        }
      })
      return result
    })
    toast.success(
      newMemberLiked ? '댓글에 좋아요를 남겼습니다.' : '좋아요를 취소했습니다.',
    )
  }

  const submitReply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue) return toast.warn('답글 내용을 입력해주세요.')

    const response = await commentService.addReply({
      aptId: aptId as string,
      postId: postId as string,
      parentId: commentId,
      content: inputValue,
    })
    const newReply: Reply = response?.data

    if (newReply) {
      const { content, createdAt, createdBy, profileImage } = newReply
      setComments((prevState) => {
        const result = prevState.map((item) => {
          if (item.commentId === commentId) {
            return {
              ...item,
              children: [
                {
                  commentId: newReply.commentId, // commentId 중복되므로 이렇게 사용함.
                  content,
                  createdAt,
                  createdBy,
                  liked: 0,
                  memberCreated: true,
                  memberLiked: false,
                  profileImage,
                  parentId: commentId,
                },
                ...item.children,
              ],
            }
          } else {
            return item
          }
        })
        return result
      })
      toast.success('답글이 등록 되었습니다.')
      setInputValue('')
    }
  }

  const deleteComment = async () => {
    const userConfirmed = confirm(
      '정말 삭제 하시겠습니까? 삭제 후에는 복구할 수 없습니다.',
    )
    if (userConfirmed) {
      const statusCode = await commentService.deleteComment({
        aptId: aptId as string,
        postId: postId as string,
        commentId,
      })
      if (statusCode === 200) {
        toast.success('댓글이 삭제 되었습니다.')
        setComments((prevState) => [
          ...prevState.filter((item) => item.commentId !== commentId),
        ])
      }
    }
  }

  return (
    <StyledWrapper>
      <StyledDiv className="row gap center">
        <Img
          src={profileImage || defaultAvatar}
          alt="댓글 아바타"
          $width="40px"
          height="40px"
        />
        <StyledDiv className="column">
          <StyledParagraph className="bold">{createdBy}</StyledParagraph>
          <StyledParagraph className="sm">{timeAgo(createdAt)}</StyledParagraph>
        </StyledDiv>
        <StyledDiv className="row full">
          {!memberCreated ||
            (!editMode && (
              <>
                <StyledButton className="mini" onClick={() => setEditMode(true)}>
                  수정
                </StyledButton>
                <StyledButton className="mini" onClick={deleteComment}>
                  삭제
                </StyledButton>
              </>
            ))}
        </StyledDiv>
        <StyledDiv className="column center">
          {like ? (
            <AiFillHeart
              fontSize="20px"
              cursor="pointer"
              color="#EA1616"
              onClick={toggleLike}
            />
          ) : (
            <AiOutlineHeart fontSize="20px" cursor="pointer" onClick={toggleLike} />
          )}
          <StyledParagraph className="sm">{liked}</StyledParagraph>
        </StyledDiv>
      </StyledDiv>
      {editMode ? (
        <EditComment
          commentId={commentId}
          content={content}
          setComments={setComments}
          setEditMode={setEditMode}
        />
      ) : (
        <StyledParagraph>{content}</StyledParagraph>
      )}
      {repliseVisible ? (
        <StyledDiv className="column">
          <StyledParagraph
            className="sm bold mainColor"
            onClick={() => setRepliseVisible(false)}
          >
            답글 닫기 <IoIosArrowUp />
          </StyledParagraph>
          <StyledDiv className=" column indent">
            <StyledForm onSubmit={submitReply}>
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
            {replies &&
              replies.map((reply) => (
                <ReplyCard
                  key={reply.commentId}
                  reply={reply}
                  setComments={setComments}
                />
              ))}
          </StyledDiv>
        </StyledDiv>
      ) : (
        <StyledParagraph
          className="sm bold mainColor"
          onClick={() => setRepliseVisible(true)}
        >
          답글 {childCounts}개 보기 <IoIosArrowDown />
        </StyledParagraph>
      )}
    </StyledWrapper>
  )
}

export default CommentCard

const StyledWrapper = styled.div`
  padding: 15px 0 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid #f2f2f2;
`
const StyledDiv = styled.div`
  display: flex;
  &.gap {
    gap: 10px;
  }

  &.row {
    flex-direction: row;
  }

  &.column {
    flex-direction: column;
  }

  &.center {
    align-items: center;
  }

  &.between {
    justify-content: space-between;
  }

  &.full {
    flex: 1;
  }

  &.indent {
    padding-left: 50px;
  }
`

const StyledForm = styled.form`
  display: flex;
  gap: 10px;
  margin: 20px 0 10px 0;
`

const StyledButton = styled.button`
  box-sizing: border-box;
  background: #ffffff;
  height: 50px;
  width: 100px;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &.mini {
    border: none;
    height: 25px;
    width: 40px;
    padding: 0px;
    font-size: 12px;
    color: #303030;
    margin-bottom: 20px;
  }

  &:hover {
    filter: brightness(0.95);
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

  &.bold {
    font-weight: 700;
  }

  &.mainColor {
    color: #2b7f75;
    cursor: pointer;
  }
`
