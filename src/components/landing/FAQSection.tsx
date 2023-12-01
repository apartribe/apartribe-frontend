import { FAQ_TEXT } from 'constants/landing/faq'
import React from 'react'
import { styled } from 'styled-components'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import FAQCard from './FAQCard'

const FAQSection = () => {
  const { eng, title, faqs } = FAQ_TEXT

  return (
    <Container $background="#FFFFFF">
      <Inner $background="#FFFFFF" $padding="40px 0">
        <StyledWrapper>
          <StyledParagraph className="md">{eng}</StyledParagraph>
          <StyledParagraph className="lg">{title}</StyledParagraph>
          <StyledDiv>
            {faqs.map((faq, index) => (
              <FAQCard key={index} faq={faq} />
            ))}
          </StyledDiv>
        </StyledWrapper>
      </Inner>
    </Container>
  )
}

export default FAQSection

const StyledWrapper = styled.div`
  width: 100%;
  height: 640px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-top: 50px;
`

const StyledParagraph = styled.p`
  margin: 0px;
  font-weight: 700;

  &.md {
    font-size: 15px;
    font-weight: 900;
    color: #2b7f75;
  }

  &.lg {
    font-size: 30px;
    font-weight: 900;
  }
`
