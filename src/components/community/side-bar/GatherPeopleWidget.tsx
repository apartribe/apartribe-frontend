import WidgetTitleArea from 'components/common/WidgetTitleArea'
import React from 'react'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import { FaPeopleGroup } from 'react-icons/fa6'

const GatherPeopleWidget = () => {
  return (
    <ShadowBox>
      <WidgetTitleArea
        Icon={FaPeopleGroup}
        title="같이 하실 분 ~"
        hasSeeMore={true}
        seeMorePath="/community/123/gather-people"
      />
      GatherPeopleWidget
    </ShadowBox>
  )
}

export default GatherPeopleWidget
