import { APT_RANK_MOCK } from 'mock/aptRankData'
import React from 'react'
import { styled } from 'styled-components'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import AptRankCard from './AptRankCard'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const AptRankSection = () => {
  const settings = {
    dots: false,
    slidesToShow: 8,
    slidesToScroll: 5, // 이걸로 속도올리면 버벅임 없음
    infinite: true,
    autoplay: true,
    speed: 10000,
    autoplaySpeed: 0,
    cssEase: 'linear',
    arrows: false,
  }

  return (
    <Container>
      <StyledWrapper>
        <Inner>
          <StyledParagraph>지금 가장 핫한 아파트 TOP 10</StyledParagraph>
        </Inner>
        <StyledDiv>
          <StyledSlider {...settings}>
            {APT_RANK_MOCK.map((aptInfo, index) => (
              <AptRankCard key={index} index={index} aptInfo={aptInfo} />
            ))}
          </StyledSlider>
        </StyledDiv>
      </StyledWrapper>
    </Container>
  )
}

export default AptRankSection

const StyledWrapper = styled.div`
  width: 100%;
  height: 450px;
`

const StyledDiv = styled.div`
  width: 2000px;
  margin: 0 auto;
`

const StyledParagraph = styled.p`
  margin: 0;
  padding: 20px;
  font-size: 30px;
  font-weight: 900;
  color: #303030;
  /* line-height: 25px; */
`

const StyledSlider = styled(Slider)`
  .slick-list {
    overflow: visible;
  }
`
