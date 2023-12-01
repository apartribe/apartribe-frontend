import React from 'react'
import { ABOUT_TEXT } from 'constants/landing/about'
import { styled } from 'styled-components'
import { Img } from 'styles/reusable-style/elementStyle'
import outsider from 'assets/about/outsider.png'
import alone from 'assets/about/alone.png'
import disappointed from 'assets/about/disappointed.png'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from 'react-icons/bi'
import { HiPlus } from 'react-icons/hi'

const { meaning, needInfo, needPeople, unnecessaryInfo } = ABOUT_TEXT

const AboutUsPage = () => {
  return (
    <>
      <Container $background="#FFFFFF">
        <Inner $background="#FFFFFF">
          <StyledWrapper className="column">
            <StyledDiv className="row">
              <StyledParagraph className="word">{meaning.word[0]}</StyledParagraph>
              <HiPlus fontSize="30px" />
              <StyledParagraph className="word">{meaning.word[1]}</StyledParagraph>
            </StyledDiv>
            {meaning.explain.map((sentence, index) => (
              <StyledParagraph key={index}>{sentence}</StyledParagraph>
            ))}
          </StyledWrapper>
        </Inner>
      </Container>
      <Container $background="#EAF6F4">
        <Inner $background="#EAF6F4">
          <StyledWrapper className="row">
            <Img src={outsider} $width="400px" $height="400px" />
            <StyledDiv className="column">
              <StyledParagraph className="title">
                <BiSolidQuoteAltLeft />
                {needInfo.title}
                <BiSolidQuoteAltRight />
              </StyledParagraph>
              {needInfo.explain.map((sentence, index) => (
                <StyledParagraph key={index}>{sentence}</StyledParagraph>
              ))}
            </StyledDiv>
          </StyledWrapper>
        </Inner>
      </Container>
      <Container $background="#FFFFFF">
        <Inner $background="#FFFFFF">
          <StyledWrapper className="row">
            <StyledDiv className="column">
              <StyledParagraph className="title">
                <BiSolidQuoteAltLeft />
                {needPeople.title}
                <BiSolidQuoteAltRight />
              </StyledParagraph>
              {needPeople.explain.map((sentence, index) => (
                <StyledParagraph key={index}>{sentence}</StyledParagraph>
              ))}
            </StyledDiv>
            <StyledDiv>
              <Img src={alone} $width="400px" $height="400px" />
            </StyledDiv>
          </StyledWrapper>
        </Inner>
      </Container>
      <Container>
        <Inner $background="#FFFFFF">
          <StyledWrapper className="row">
            <Img src={disappointed} $width="400px" $height="400px" />
            <StyledDiv className="column">
              <StyledParagraph className="title">
                <BiSolidQuoteAltLeft />
                {unnecessaryInfo.title}
                <BiSolidQuoteAltRight />
              </StyledParagraph>
              {unnecessaryInfo.explain.map((sentence, index) => (
                <StyledParagraph key={index}>{sentence}</StyledParagraph>
              ))}
            </StyledDiv>
          </StyledWrapper>
        </Inner>
      </Container>
    </>
  )
}

export default AboutUsPage

const StyledWrapper = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  color: #303030;
  &.row {
    flex-direction: row;
    align-items: center;
  }

  &.column {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const StyledDiv = styled.div`
  display: flex;
  margin: 50px;
  &.row {
    width: 500px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &.column {
    flex-direction: column;
  }
`

const StyledParagraph = styled.main`
  font-weight: 900;
  font-size: 20px;
  line-height: 50px;

  &.word {
    font-size: 50px;
    font-weight: 900;
  }

  &.title {
    font-size: 35px;
    font-weight: 900;
    margin: 50px 0;
  }

  &.gap {
  }
`
