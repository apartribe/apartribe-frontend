import { LogoMainWhite } from 'assets/logos'
import SearchBar from 'components/ui/SearchBar'
import { BANNER_TEXT } from 'constants/landing/banner'
import React from 'react'
import { styled } from 'styled-components'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'

const BannerSection = () => {
  const { title, question, explain, doIt } = BANNER_TEXT

  return (
    <Container $background="#FFFFFF">
      <Inner>
        <StyledWrapper>
          <StyledDiv className="left">
            <StyledParagraph className="sm">{title}</StyledParagraph>
            <StyledParagraph className="xl">
              {question[0]}
              <br />
              {question[1]}
            </StyledParagraph>
            <StyledParagraph className="sm">
              {explain[0]}
              <br />
              {explain[1]}
            </StyledParagraph>
            <StyledParagraph className="lg">{doIt}</StyledParagraph>
            <SearchBar $color="#FFFFFF" />
          </StyledDiv>
          <StyledDiv className="right">
            <LogoMainWhite width="350px" height="400px" />
          </StyledDiv>
        </StyledWrapper>
      </Inner>
    </Container>
  )
}

export default BannerSection

const StyledWrapper = styled.div`
  background: linear-gradient(
    330deg,
    rgba(26, 42, 58, 1) 0%,
    rgba(56, 71, 81, 1) 75%,
    rgba(75, 89, 99, 1) 84%,
    rgba(61, 75, 85, 1) 92%,
    rgba(26, 42, 58, 1) 100%
  );
  width: 100%;
  height: 450px;
  border-radius: 20px;
  display: flex;
  margin-bottom: 20px;
  color: #ffffff;
`

const StyledDiv = styled.div`
  display: flex;

  &.left {
    width: 50%;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    margin-left: 100px;
  }

  &.right {
    width: 50%;
    justify-content: center;
    align-items: center;
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
    line-height: 25px;
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
