import React, { FC, useState, Dispatch, SetStateAction } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { styled } from 'styled-components'
import { timeAgo } from 'utils/timeAgo'
// import { Img } from 'styles/reusable-style/elementStyle'
import { Img } from 'styles/reusable-style/elementStyle'
import { Comment, Reply } from 'types/community-type/commentType'
import EditReply from './EditReply'
import dafaultAvatar from 'assets/users/defaultAvatar.png'
import { useParams } from 'react-router-dom'
import { likeService } from 'services/community/likeService'

interface Props {
  reply: Reply
  setComments: Dispatch<SetStateAction<Comment[]>>
}

const ReplyCard: FC<Props> = ({
  reply: {
    commentId,
    content,
    createdAt,
    createdBy,
    liked,
    memberCreated,
    memberLiked,
    parentId,
    profileImage,
  },
  setComments,
}) => {
  const { aptId, postId } = useParams()

  const [like, setLike] = useState(memberLiked)
  const [editMode, setEditMode] = useState(false)

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
        if (item.commentId === parentId) {
          const test = item.children.map((item) => {
            if (item.commentId === commentId) {
              return { ...item, liked: newMemberLiked ? item.liked + 1 : item.liked - 1 }
            } else {
              return item
            }
          })
          return { ...item, children: test }
        } else {
          return item
        }
      })
      return result
    })
  }
  const editReply = () => {
    setEditMode(true)
  }

  const deleteReply = () => {
    alert('답글 삭제')
  }

  return (
    <StyledWrapper>
      <StyledDiv className="row gap center">
        <Img
          src={profileImage || dafaultAvatar}
          alt="댓글 아바타"
          $width="40px"
          height="40px"
        />
        <StyledDiv className="column">
          <StyledParagraph className="bold">{createdBy}</StyledParagraph>
          <StyledParagraph className="sm">{timeAgo(createdAt)}</StyledParagraph>
        </StyledDiv>
        <StyledDiv className="row start gap full">
          {!memberCreated ||
            (!editMode && (
              <>
                <StyledButton className="mini" onClick={editReply}>
                  수정
                </StyledButton>
                <StyledButton className="mini" onClick={deleteReply}>
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
        <EditReply
          parentId={parentId}
          commentId={commentId}
          content={content}
          setComments={setComments}
          setEditMode={setEditMode}
        />
      ) : (
        <StyledParagraph>{content}</StyledParagraph>
      )}
    </StyledWrapper>
  )
}

export default ReplyCard

const StyledWrapper = styled.div`
  padding: 20px 0 0 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
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

const StyledButton = styled.button`
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
  }
`
