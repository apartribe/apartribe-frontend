import React, { FC, useState, useEffect, Dispatch, SetStateAction } from 'react'
import { styled } from 'styled-components'
import { timeAgo } from 'utils/timeAgo'
import { AiOutlineEye, AiOutlineLike, AiOutlineDelete } from 'react-icons/ai'
import { BiConversation, BiShareAlt } from 'react-icons/bi'
import { PiPencilSimpleLineDuotone } from 'react-icons/pi'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import { articleService } from 'services/community/articleService'
import { BoardType } from 'services/community/postsService'
import { ArticleDetailType } from 'types/community-type/ArticleType'
import { AnnounceDetailType } from 'types/community-type/announceType'
import { TogetherDetailType } from 'types/community-type/togetherType'
import { likeService } from 'services/community/likeService'
import { Img } from 'styles/reusable-style/elementStyle'
import defaultAvatar from 'assets/users/defaultAvatar.png'
import { commentService } from 'services/community/commentService'
import { toast } from 'react-toastify'

// 타입 수정 요망!
interface Props<T> {
  boardType: BoardType
  postData: T
  setPostData: Dispatch<SetStateAction<T>>
}

const DetailHeaderSection = <
  T extends ArticleDetailType | AnnounceDetailType | TogetherDetailType,
>({
  boardType,
  postData: {
    category,
    level,
    title,
    createdAt,
    createdBy,
    liked,
    saw,
    memberLiked,
    profileImage,
    memberCreated,
    onlyApartUser,
    position,
  },
  setPostData,
}: Props<T>) => {
  const { aptId, postId } = useParams()
  const navigate = useNavigate()

  const [commentCount, setCommentsCount] = useState<number | null>(null)

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
    navigate(`/community/${aptId}/${boardType}/${postId}/edit`)
  }

  const deletePost = async () => {
    const userConfirmed = confirm(
      '정말 삭제 하시겠습니까? 삭제 후에는 복구할 수 없습니다.',
    )
    if (userConfirmed) {
      const statusCode = await articleService.deletePost({
        boardType,
        aptId: aptId as string,
        postId: postId as string,
      })
      if (statusCode === 200) {
        toast.success('게시물이 삭제 되었습니다.')
        navigate(`/community/${aptId}`)
      }
    }
  }

  const toggleLike = async () => {
    const response = await likeService.postLike({
      aptId: aptId as string,
      boardType,
      postId: postId as string,
    })
    const newMemberLiked: boolean = response.data.liked
    setPostData((prevState: T) => ({
      ...prevState,
      memberLiked: newMemberLiked,
      liked: newMemberLiked ? prevState.liked + 1 : prevState.liked - 1,
    }))
    toast.success(
      newMemberLiked ? '게시물에 좋아요를 남겼습니다.' : '좋아요를 취소했습니다.',
    )
  }

  useEffect(() => {
    const getCommentCount = async () => {
      const response = await commentService.getCommentCount({
        aptId: aptId as string,
        postId: postId as string,
      })
      setCommentsCount(response.data.commentCount)
    }

    getCommentCount()
  }, [])

  return (
    <StyledWrapper>
      <StyledDiv className="between">
        <StyledParagraph className="md">
          {decidePath()} &nbsp;&gt;&nbsp; {category}
          {level} &nbsp;&nbsp;
        </StyledParagraph>
        {onlyApartUser && (
          <StyledParagraph className="sm yellow">
            <BsFillShieldLockFill />
            우리 아파트 회원만 볼 수 있는 게시물입니다.
          </StyledParagraph>
        )}

        <StyledDiv>
          {memberCreated && (
            <>
              <StyledButton className="lg" onClick={moveToEditPage}>
                <PiPencilSimpleLineDuotone />
              </StyledButton>
              <StyledButton className="lg" onClick={deletePost}>
                <AiOutlineDelete />
              </StyledButton>
            </>
          )}
        </StyledDiv>
      </StyledDiv>
      <StyledDiv>
        <StyledParagraph className="xl">{title}</StyledParagraph>
      </StyledDiv>
      <StyledDiv className="between">
        <StyledDiv>
          <StyledParagraph className="md">{timeAgo(createdAt)}</StyledParagraph>
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
            {commentCount}
          </StyledParagraph>
        </StyledDiv>
        <StyledDiv>
          <StyledButton className={memberLiked ? 'active' : ''} onClick={toggleLike}>
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
        <Img
          src={profileImage || defaultAvatar}
          alt="댓글 아바타"
          $width="40px"
          height="40px"
        />
        {position ? (
          <p>
            [{position}] {createdBy}
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
    height: 40px;
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

  &.yellow {
    color: #ffa409;
  }
`

const StyledButton = styled.button`
  background: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 10px;
  cursor: pointer;
  font-size: 12px;

  &.active {
    color: #ea1616;
  }

  &.lg {
    font-size: 20px;
  }

  &:hover {
    filter: brightness(0.95);
  }
`
