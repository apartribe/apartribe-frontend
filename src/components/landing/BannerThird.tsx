import React from 'react'
import { styled } from 'styled-components'
import { LogoMainWhite } from 'assets/logos'
import AptSearchBar from 'components/common/apt-sugget-search-bar/AptSearchBar'
import { BANNER_TEXT } from 'constants/landing/banner'

const BannerThird = () => {
  const { title, question, explain, doIt } = BANNER_TEXT[2]

  return (
    <StyledWrapper>
      <StyledDiv className="right">
        <LogoMainWhite width="350px" height="400px" />
      </StyledDiv>
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
        <AptSearchBar />
      </StyledDiv>
    </StyledWrapper>
  )
}

export default BannerThird

const StyledWrapper = styled.div`
  background: linear-gradient(
    330deg,
    #2b7f75 0%,
    #384751 75%,
    #4b5963 84%,
    #3d4b55 92%,
    #2b7f75 100%
  );
  width: 100%;
  height: 450px;
  border-radius: 20px;
  display: flex;
  /* margin-bottom: 20px; */
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
    margin-bottom: 50px;
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
    margin-top: 10px;
  }

  &.xl {
    font-size: 30px;
    font-weight: 900;
  }
`
