import React from 'react'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import BannerFirst from './BannerFirst'
import BannerSecond from './BannerSecond'
import BannerThird from './BannerThird'

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
    <Container $background="#FFFFFF">
      <Inner>
        <Slider {...settings}>
          <div>
            <BannerFirst />
          </div>
          <div>
            <BannerSecond />
          </div>
          <div>
            <BannerThird />
          </div>
        </Slider>
      </Inner>
    </Container>
  )
}

export default BannerSection
