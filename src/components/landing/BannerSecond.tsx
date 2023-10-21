import React from 'react'
import { styled } from 'styled-components'
import { LogoMainWhite, LogoOnlyIconWhite } from 'assets/logos'
import AptSearchBar from 'components/common/apt-sugget-search-bar/AptSearchBar'
import { BANNER_TEXT } from 'constants/landing/banner'

const BannerSecond = () => {
  const { title, question, explain, doIt } = BANNER_TEXT[1]

  return (
    <StyledWrapper>
      <StyledDiv className="left">
        <StyledParagraph className="sm">{title}</StyledParagraph>
        <StyledParagraph className="lg">{question[0]}</StyledParagraph>
        <br />
        <StyledParagraph className="xl">{question[1]}</StyledParagraph>
        <br />
        <br />
        <br />
        <StyledParagraph className="sm">
          {explain[0]}
          <br />
          {explain[1]}
        </StyledParagraph>
      </StyledDiv>
      <StyledLogoOnlyIconWhite className="left" />
      <StyledLogoOnlyIconWhite className="right" />
    </StyledWrapper>
  )
}

export default BannerSecond

const StyledWrapper = styled.div`
  background: linear-gradient(
    330deg,
    #f3eada 0%,
    #ccb897 75%,
    #b8a584 84%,
    #efddbe 92%,
    #f3eada 100%
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
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  &.right {
    width: 50%;
    justify-content: center;
    align-items: center;
  }
`

const StyledParagraph = styled.p`
  margin: 0px;
  text-align: center;

  &.sm {
    font-size: 15px;
    font-weight: 900;
    display: flex;
    gap: 5px;
    align-items: center;
    line-height: 25px;
  }

  &.lg {
    font-size: 30px;
    margin-top: 40px;
    font-weight: 900;
    line-height: 0px;
  }

  &.xl {
    font-size: 60px;
    font-weight: 900;
    letter-spacing: 5px;
    line-height: 40px;
  }
`

const StyledLogoOnlyIconWhite = styled(LogoOnlyIconWhite)`
  position: absolute;
  width: 300px;
  height: 300px;

  &.left {
    top: -50px;
    left: -80px;
    transform: rotate(180deg);
  }

  &.right {
    bottom: -20px;
    right: -80px;
  }
`
