import { ADVERTISEMENT_LIST } from 'constants/advertisementList'
import React from 'react'
import { Img, ShadowBox } from 'styles/reusable-style/elementStyle'

const AdvertisementWidget = () => {
  return (
    <ShadowBox
      $background={ADVERTISEMENT_LIST[0].backgroundColor}
      $height="80px"
      $display="flex"
      $justifyContent="center"
    >
      <Img src={ADVERTISEMENT_LIST[0].img} alt="광고" $width="100px" />
    </ShadowBox>
  )
}

export default AdvertisementWidget
