import { APT_RANK_MOCK } from 'mock/aptRankData'
import React from 'react'
import { styled, keyframes } from 'styled-components'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import AptRankCard from './AptRankCard'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const AptRankSection = () => {
  return (
    <Container>
      <Inner>
        <StyledParagraph>이 시간 가장 핫한 아파트 TOP 10</StyledParagraph>
      </Inner>
      <StyledWrapper>
        <StyledDiv className="original">
          {APT_RANK_MOCK.map((aptInfo, index) => (
            <AptRankCard key={index} index={index} aptInfo={aptInfo} />
          ))}
        </StyledDiv>
        <StyledDiv className="clone">
          {APT_RANK_MOCK.map((aptInfo, index) => (
            <AptRankCard key={index} index={index} aptInfo={aptInfo} />
          ))}
        </StyledDiv>
      </StyledWrapper>
    </Container>
  )
}

export default AptRankSection

const infiniteAnimation1 = keyframes`
    0% {
        
        transform: translateX(0%);
    }
    50% {
        visibility: hidden;
        transform: translateX(-100%);
    }
    50.0001% {
        transform: translateX(100%);
        visibility: visible;
    }
    100% {
        transform: translateX(0%);
    }
`

const infiniteAnimation2 = keyframes`
    0% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(-200%);
    }
`

const StyledDiv = styled.ul`
  display: flex;
  margin: 0;
  gap: 20px;
  // 상위 요소에 gap을 넣은 것은 한계점이 있음
  // 하위 요소들의 사이에만 추가되는데, 좌우 위치가 뒤바뀌는 지금의 로직에서는
  // 좌우가 전환 되었을 때, gap이 적용되지 않음.
  // margin 사용시에도 겹쳐지는 한계 있음.
  padding: 0 10px;

  &.original {
    animation: ${infiniteAnimation1} 50s linear infinite normal none running;
  }

  &.clone {
    animation: ${infiniteAnimation2} 50s linear infinite;
  }
`

const StyledWrapper = styled.div`
  overflow: hidden;
  margin: 0 auto;
  width: 2500px;
  height: 350px;
  display: flex; // 원리가 궁금하다면 주석 처리

  &:hover > ${StyledDiv} {
    animation-play-state: paused;
  }
`

const StyledParagraph = styled.p`
  margin: 0;
  padding-top: 30px;
  font-size: 30px;
  font-weight: 900;
  color: #303030;
  line-height: 40px;
`
