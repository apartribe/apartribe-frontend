import React from 'react'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import BannerFirst from './BannerFirst'
import BannerSecond from './BannerSecond'
import BannerThird from './BannerThird'
import { styled } from 'styled-components'

const BannerSection = () => {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  return (
    <Container $background="#FFFFFF" $height="500px">
      <Inner>
        <StyledSlider {...settings}>
          <div>
            <BannerFirst />
          </div>
          <div>
            <BannerSecond />
          </div>
          <div>
            <BannerThird />
          </div>
        </StyledSlider>
      </Inner>
    </Container>
  )
}

export default BannerSection

const StyledSlider = styled(Slider)`
  .slick-list {
    overflow: visible;
    z-index: 10; // 없을 시 하위에 아파트 랭크 케러셸이 검색어 박스를 가림/
  }
`
