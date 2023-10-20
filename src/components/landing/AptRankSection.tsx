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
    slidesToShow: 8,
    slidesToScroll: 0.5,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 700,
    cssEase: 'linear',
  }

  return (
    <Container>
      <StyledWrapper>
        <Inner>
          <StyledParagraph>지금 가장 핫한 아파트 TOP 10</StyledParagraph>
        </Inner>
        <StyledDiv>
          <Slider {...settings}>
            {APT_RANK_MOCK.map((aptInfo, index) => (
              <AptRankCard key={index} index={index} aptInfo={aptInfo} />
            ))}
          </Slider>
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
`

const StyledParagraph = styled.p`
  margin: 0;
  padding: 20px;
  font-size: 30px;
  font-weight: 900;
  color: #303030;
  /* line-height: 25px; */
`
