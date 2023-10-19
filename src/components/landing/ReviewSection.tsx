import { REVIEW_TEXT } from 'constants/landing/review'
import React from 'react'
import { styled } from 'styled-components'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import ReviewCard from './ReviewCard'

const ReviewSection = () => {
  const { title, question, reviews } = REVIEW_TEXT

  return (
    <Container $background="#EAF6F4">
      <Inner $background="#EAF6F4" $padding="40px 0">
        <StyledWrapper>
          <StyledParagraph>{title}</StyledParagraph>
          <StyledParagraph className="xl">
            {question[0]}
            <br />
            {question[1]}
          </StyledParagraph>
          <StyledDiv>
            {reviews.map((review, index) => (
              <ReviewCard key={index} index={index} review={review} />
            ))}
          </StyledDiv>
        </StyledWrapper>
      </Inner>
    </Container>
  )
}

export default ReviewSection

const StyledWrapper = styled.div`
  background: #2b7f75;
  width: 100%;
  height: 640px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  border-radius: 20px;
  color: #ffffff;
`

const StyledDiv = styled.div`
  display: flex;
  gap: 40px;
`

const StyledParagraph = styled.p`
  margin: 0px;

  &.sm {
    font-size: 12px;
    display: flex;
    gap: 5px;
    align-items: center;
    color: #c8c8c8;
    line-height: 25px;
  }

  &.lg {
    font-size: 20px;
    margin-top: 40px;
  }

  &.xl {
    font-size: 30px;
    font-weight: 900;
    line-height: 50px;
  }
`
