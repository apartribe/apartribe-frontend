import React, {
  FC,
  FormEvent,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react'
import { styled } from 'styled-components'
import { /* Img, */ Input } from 'styles/reusable-style/elementStyle'
import { timeAgo } from 'utils/timeAgo'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import ReplyCard from './ReplyCard'
import { Comment, Reply } from './DetailCommentSection'
import { replyService } from 'services/community/replyService'

interface Props {
  postId: string
  comment: Comment
  setComments: Dispatch<SetStateAction<Comment[]>>
}

const CommentCard: FC<Props> = ({
  postId,
  comment: {
    /* avatar, */ id: parentId,
    createdBy,
    createdAt,
    content,
    like: liked,
    children: replies,
  },
  setComments,
}) => {
  const [repliseVisible, setRepliseVisible] = useState(false)
  const [like, setLike] = useState(false) // 추후 저장값으로 대체 필요
  const [inputValue, setInputValue] = useState('')

  const changeInputValuse = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const toggleLike = () => {
    setLike((prev) => !prev)
  }

  const submitReply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await replyService.addReply({
      postId,
      parentId,
      content: inputValue,
    })
    const newReply: Reply = response?.data

    if (newReply) {
      setComments((prevState) => {
        const result = prevState.map((item) => {
          if (item.id === parentId) {
            return { ...item, children: [newReply, ...item.children] }
          } else {
            return item
          }
        })
        return result
      })
    }
    setInputValue('')
  }

  const editReply = () => {
    alert('답글 수정')
  }

  const deleteReply = () => {
    alert('답글 삭제')
  }

  return (
    <StyledWrapper>
      <StyledDiv className="row gap center">
        {/* <Img src={avatar} alt="댓글 아바타" $width="40px" height="40px" /> */}
        <StyledDiv className="column">
          <StyledParagraph className="bold">{createdBy}</StyledParagraph>
          <StyledParagraph className="sm">{timeAgo(createdAt)}</StyledParagraph>
        </StyledDiv>
        <StyledDiv className="row gap full">
          <StyledButton className="mini" onClick={editReply}>
            수정
          </StyledButton>
          <StyledButton className="mini" onClick={deleteReply}>
            삭제
          </StyledButton>
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
      <StyledParagraph>{content}</StyledParagraph>
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
                placeholder="답글을 입력하세요."
                value={inputValue}
                onChange={changeInputValuse}
              />
              <StyledButton type="submit">등록</StyledButton>
            </StyledForm>
            {replies &&
              replies.map((reply) => <ReplyCard key={reply.id} reply={reply} />)}
          </StyledDiv>
        </StyledDiv>
      ) : (
        <StyledParagraph
          className="sm bold mainColor"
          onClick={() => setRepliseVisible(true)}
        >
          답글 {replies.length}개 보기 <IoIosArrowDown />
        </StyledParagraph>
      )}
    </StyledWrapper>
  )
}

export default CommentCard

const StyledWrapper = styled.div`
  padding: 30px 0;
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
    height: 15px;
    width: 25px;
    padding: 0px;
    font-size: 12px;
    color: #303030;
    margin-bottom: 25px;
  }

  &:hover {
    transform: scale(1.05);
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
