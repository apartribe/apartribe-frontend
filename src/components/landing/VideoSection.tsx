import React from 'react'
import YouTube from 'react-youtube'
import { styled } from 'styled-components'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from 'react-icons/bi'

const VideoSection = () => {
  return (
    <Container $background="#FFFFFF">
      <Inner $background="none" $padding="40px 0">
        <StyledWrapper>
          <StyledDiv className="left">
            <YouTube
              style={{ width: '100%', height: '100%' }}
              videoId="_iH4ivxUYsc"
              opts={{
                width: '100%',
                height: '100%',
              }}
            />
          </StyledDiv>
          <StyledDiv className="right">
            <StyledParagraph className="md">
              우리의 삶속 가장 가까이 있던 그 이름
            </StyledParagraph>
            <StyledParagraph className="xl">
              <BiSolidQuoteAltLeft /> 이웃사촌 <BiSolidQuoteAltRight />
            </StyledParagraph>
            <StyledParagraph className="md">
              우리는 사실 그 때의 정을 그리워합니다
              <br />그 때의 온정을 우리 아이가 느끼며 자랄 수 있도록
            </StyledParagraph>
            <StyledParagraph className="lg">
              <b>아파트라이브</b>가 함께하겠습니다
            </StyledParagraph>
          </StyledDiv>
        </StyledWrapper>
      </Inner>
    </Container>
  )
}

export default VideoSection

const StyledWrapper = styled.div`
  width: 100%;
  height: 432px;
  display: flex;
`

const StyledDiv = styled.div`
  display: flex;

  &.left {
    width: 60%;
    border-radius: 20px;
    overflow: hidden;
  }

  &.right {
    width: 40%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`

const StyledParagraph = styled.p`
  margin: 0px;
  color: #303030;

  &.md {
    font-size: 15px;
    display: flex;
    gap: 5px;
    align-items: center;
    line-height: 25px;
    text-align: center;
  }

  &.lg {
    font-size: 20px;
    margin-top: 40px;
  }

  &.xl {
    font-size: 30px;
    font-weight: 900;
    margin: 30px;
    /* color: #2B7F75; */
  }
`
