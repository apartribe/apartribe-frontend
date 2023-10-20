import { BronzeMedal, GoldMedal, SilverMedal } from 'assets/rank'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { Badge } from 'styles/reusable-style/elementStyle'
import { AptInfo } from 'types/community-type/aptType'
import { timeAgo } from 'utils/timeAgo'

interface Props {
  index: number
  aptInfo: AptInfo
}

const AptRankCard: FC<Props> = ({ index, aptInfo }) => {
  const { id, img, badge, name, location, recentPost, userCount } = aptInfo

  const decideMedal = () => {
    if (index === 0) return <GoldMedal />
    if (index === 1) return <SilverMedal />
    if (index === 2) return <BronzeMedal />
    return ''
  }

  const navigate = useNavigate()
  const moveToCommunity = () => {
    navigate(`/community/${id}`)
  }

  return (
    <StyledWrapper onClick={moveToCommunity}>
      <StyledDiv className="medal">{decideMedal()}</StyledDiv>
      {badge ? (
        <StyledDiv className="badge">
          <Badge $background="#E18745">{badge}</Badge>
        </StyledDiv>
      ) : (
        ''
      )}
      <StyledDiv className="img">
        <StyledImg src={img} alt="" />
      </StyledDiv>
      <StyledDiv className="column">
        <StyledParagraph className="md">{name}</StyledParagraph>
        <StyledParagraph className="sm">{location}</StyledParagraph>
        <StyledDiv className="row">
          <StyledParagraph className="sm lineHeight">
            최근 업데이트 <br /> {timeAgo(recentPost)}
          </StyledParagraph>
          <StyledParagraph className="lg">{userCount}명</StyledParagraph>
        </StyledDiv>
      </StyledDiv>
    </StyledWrapper>
  )
}

export default AptRankCard

const StyledWrapper = styled.div`
  position: relative;
  background: #ffffff;
  box-shadow: 5px 5px 4px -1px rgba(0, 0, 0, 0.25);
  margin-top: 20px;
  padding: 5px;
  width: 220px;
  height: 300px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    img {
      transform: scale(1.05);
      transition: 0.1s ease-in-out;
    }
  }
`

const StyledImg = styled.img`
  height: 210px;
`

const StyledDiv = styled.div`
  display: flex;

  &.medal {
    position: absolute;
    top: -20px;
    left: -20px;
    z-index: 1;
    /* width: 100px;
height: 100px; */
  }

  &.badge {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
  }

  &.img {
    width: 210px;
    height: 200px;
    overflow: hidden;
    border-radius: 5px;
  }

  &.row {
    flex-direction: row;
    gap: 20px;
    margin-top: 5px;
    justify-content: space-between;
  }

  &.column {
    flex-direction: column;
    width: 190px;
  }
`

const StyledParagraph = styled.p`
  margin: 0px;

  &.sm {
    font-size: 12px;
    display: flex;
    gap: 5px;
    align-items: center;
    color: #303030;
    line-height: 25px;
  }

  &.lineHeight {
    line-height: 17px;
  }

  &.md {
    font-weight: 700;
  }

  &.lg {
    font-size: 20px;
    font-weight: 700;
  }
`
