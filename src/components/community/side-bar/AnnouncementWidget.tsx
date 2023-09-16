import WidgetTitleArea from 'components/common/WidgetTitleArea'
import React from 'react'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import { HiSpeakerphone } from 'react-icons/hi'

const AnnouncementWidget = () => {
  return (
    <ShadowBox>
      <WidgetTitleArea
        Icon={HiSpeakerphone}
        title="치직.. 관리실에서 전파합니다."
        hasSeeMore={true}
        seeMorePath="/community/123/announcements"
      />
      AnnouncementWidget
    </ShadowBox>
  )
}

export default AnnouncementWidget
