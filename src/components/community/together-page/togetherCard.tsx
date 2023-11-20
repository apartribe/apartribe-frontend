import React, { FC } from 'react'
import { Badge, P } from 'styles/reusable-style/elementStyle'
import { styled } from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { TogetherCardType } from 'types/community-type/togetherType'
import { timeAgo } from 'utils/timeAgo'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { useAppSelector } from 'hooks/useRedux'

interface Props {
  post: TogetherCardType
}

const TogetherCard: FC<Props> = ({
  post: {
    id,
    createdBy,
    createdAt,
    recruitStatus,
    title,
    description,
    thumbnail,
    onlyApartUser,
  },
}) => {
  const { aptId } = useParams()
  const navigate = useNavigate()

  const userInfo = useAppSelector((state) => state.user?.userInfo)

  const notMyApt = aptId !== userInfo.apartCode

  const moveToDetail = () => {
    if (onlyApartUser && notMyApt) return
    navigate(`/community/${aptId}/together/${id}/detail`)
  }

  const badgeColor = (urgency: string): string => {
    if (urgency === '모집중') return '#E18745'
    return '#303030'
  }

  return (
    <StyledBox onClick={moveToDetail}>
      {onlyApartUser && notMyApt && (
        <NoPermissionBlock>
          <BsFillShieldLockFill />
          아파트 주민에게만 공개된 게시물입니다.
        </NoPermissionBlock>
      )}
      <Badge
        $position="absolute"
        $top="10px"
        $right="10px"
        $background={badgeColor(recruitStatus)}
      >
        {recruitStatus}
      </Badge>
      <StyledImgWrapper>
        <StyledImg src={thumbnail} alt="썸네일" />
      </StyledImgWrapper>
      <StyledDiv className="column">
        <StyledParagraph className="singleLineEclips">
          {onlyApartUser && (
            <>
              <BsFillShieldLockFill fontSize={12} />
              &nbsp;
            </>
          )}
          {title}
        </StyledParagraph>
        <P $fontSize="12px" $lineHeight="20px" $fontWeight="700">
          {createdBy}
        </P>
        <P $fontSize="10px" $color="#b3b3b3" $lineHeight="10px">
          {timeAgo(createdAt)}
        </P>
        <StyledParagraph className="doubleLineEclips">{description}</StyledParagraph>
      </StyledDiv>
    </StyledBox>
  )
}

export default TogetherCard

const StyledBox = styled.div`
  background: #ffffff;
  position: relative;
  width: 435px;
  height: 150px;
  margin: 10px 5px 0 5px;
  padding: 10px;
  display: flex;
  gap: 20px;
  box-sizing: border-box;
  box-shadow: 5px 5px 4px -1px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: #303030;
  cursor: pointer;

  &:hover {
    img {
      transform: scale(1.05);
      transition: 0.1s ease-in-out;
    }
  }
`

const StyledDiv = styled.div`
  &.row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }

  &.column {
    display: flex;
    flex-direction: column;
  }
`

const StyledParagraph = styled.p`
  margin: 0;
  word-break: break-all;

  &.singleLineEclips {
    font-size: 20px;
    line-height: 30px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    font-size: 17px;
    font-weight: 700;
  }

  &.doubleLineEclips {
    margin: 15px 0 0 0;
    font-size: 12px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
`
const StyledImgWrapper = styled.div`
  min-width: 150px;
  min-height: 130px;
  border-radius: 5px;
  overflow: hidden;
`

const StyledImg = styled.img`
  width: 150px;
  height: 150px;
`

const NoPermissionBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: beige;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(3px);
  font-weight: 700;
  cursor: not-allowed;
  z-index: 10;
`
