import React, { FC } from 'react'
import { styled } from 'styled-components'
import { FAQ } from 'types/landingType'

interface Props {
  faq: FAQ
}

const FAQCard: FC<Props> = ({ faq }) => {
  return (
    <StyledWrapper>
      <StyledParagraph className="question">
        <b>Q.</b> {faq.question}
      </StyledParagraph>
      <StyledParagraph className="answer">
        <b>A.</b> {faq.answer}
      </StyledParagraph>
    </StyledWrapper>
  )
}

export default FAQCard

const StyledWrapper = styled.div`
  background: #eaf6f4;
  width: 600px;
  height: 120px;
  padding: 20px;
  border-radius: 20px;

  &:hover {
    transform: translate(0, -5px);
    transition: 0.2s ease-in-out;
  }
`

const StyledParagraph = styled.p`
  margin: 5px;
  line-height: 25px;

  &.question {
    color: #2b7f75;
    font-weight: 700;
  }

  &.answer {
    color: #303030;
  }
`
