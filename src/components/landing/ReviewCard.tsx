import React, { FC } from 'react'
import { styled } from 'styled-components'
import { Img } from 'styles/reusable-style/elementStyle'

interface ReviewData {
  contents: string
  avatar: string
  nickname: string
  info: string
}

interface Props {
  index: number
  review: ReviewData
}

const ReviewCard: FC<Props> = ({ index, review }) => {
  const { contents, avatar, nickname, info } = review

  return (
    <StyledWrapper className={index % 2 === 0 ? '' : 'fill'}>
      <StyledParagraph className="md">{contents}</StyledParagraph>
      <StyledDiv className="row">
        <Img
          src={avatar}
          alt="후기 아바타"
          $width="50px"
          $height="50px"
          $borderRadius="100%"
        />
        <StyledDiv className="column">
          <StyledParagraph className="md">
            <b>{nickname}</b> 님
          </StyledParagraph>
          <StyledParagraph className="sm">{info}</StyledParagraph>
        </StyledDiv>
      </StyledDiv>
    </StyledWrapper>
  )
}

export default ReviewCard

const StyledWrapper = styled.div`
  width: 100%;
  height: 370px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ffffff;
  border-radius: 20px;
  color: #ffffff;

  &.fill {
    background: #ffffff3d;
  }

  &:hover {
    transform: translate(0, -5px);
    transition: 0.2s ease-in-out;
  }
`

const StyledDiv = styled.div`
  display: flex;

  &.row {
    align-items: center;
  }

  &.column {
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
  }
`

const StyledParagraph = styled.p`
  margin: 0px;

  &.sm {
    font-size: 12px;
    display: flex;
    gap: 5px;
    align-items: center;
    color: #c8c8c8;
    line-height: 10px;
  }

  &.md {
    line-height: 30px;
  }

  &.lg {
    font-size: 20px;
    margin-top: 40px;
  }

  &.xl {
    font-size: 30px;
    font-weight: 900;
  }
`
