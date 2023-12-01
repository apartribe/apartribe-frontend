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
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  }

  return (
    <Container>
      <Inner>
        <StyledParagraph>이 시간 가장 핫한 아파트 TOP 10</StyledParagraph>
      </Inner>
      <StyledWrapper>
        <StyledSlider {...settings}>
          {APT_RANK_MOCK.map((aptInfo, index) => (
            <AptRankCard key={index} index={index} aptInfo={aptInfo} />
          ))}
        </StyledSlider>
      </StyledWrapper>
    </Container>
  )
}

export default AptRankSection

const StyledWrapper = styled.div`
  width: 1240px;
  margin: 0 auto;
`

const StyledParagraph = styled.p`
  margin: 0;
  padding-top: 30px;
  font-size: 30px;
  font-weight: 900;
  color: #303030;
  line-height: 40px;
`

const StyledSlider = styled(Slider)`
  .slick-list {
    padding: 0 20px 20px;

    &:hover {
      animation-play-state: paused;
    }
  }
`
