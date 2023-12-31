import React from 'react'
import { ADVERTISEMENT_LIST } from 'constants/advertisementList'
import { Img, ShadowBox } from 'styles/reusable-style/elementStyle'
import Slider from 'react-slick'
import { styled } from 'styled-components'

const AdvertisementWidget = () => {
  const moveToDetail = (url: string) => {
    window.location.href = url
  }

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: false,
  }

  return (
    <StyledWrapper>
      <StyledSlider {...settings}>
        {ADVERTISEMENT_LIST.map(({ url, img, sponsor, backgroundColor }, index) => (
          <div key={index}>
            <ShadowBox
              // $boxShadow="none"
              $background={backgroundColor}
              $height="80px"
              $display="flex"
              $justifyContent="center"
              $cursor="pointer"
              onClick={() => moveToDetail(url)}
            >
              <Img src={img} alt={sponsor} $width="100px" />
            </ShadowBox>
          </div>
        ))}
      </StyledSlider>
    </StyledWrapper>
  )
}

export default AdvertisementWidget

const StyledWrapper = styled.section`
  overflow: hidden;
  padding: 5px;
`

const StyledSlider = styled(Slider)`
  .slick-list {
    overflow: visible;
  }
`
