import WidgetTitleArea from 'components/common/WidgetTitleArea'
import React from 'react'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import { FaRankingStar } from 'react-icons/fa6'

const BestPostsWidget = () => {
  return (
    <ShadowBox>
      <WidgetTitleArea Icon={FaRankingStar} title="베스트 글" hasSeeMore={false} />
      BestPostsWidget
    </ShadowBox>
  )
}

export default BestPostsWidget
