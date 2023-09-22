import WidgetTitleArea from 'components/common/WidgetTitleArea'
import React from 'react'
import { Badge, P, ShadowBox } from 'styles/reusable-style/elementStyle'
import { HiSpeakerphone } from 'react-icons/hi'
import { ANNONCEMENT_MOCK } from 'mock/announcementData'
import { styled } from 'styled-components'

const AnnouncementWidget = () => {
  return (
    <ShadowBox>
      <WidgetTitleArea
        Icon={HiSpeakerphone}
        title="치직.. 관리실에서 전파합니다."
        hasSeeMore={true}
        seeMorePath="/community/123/announcements"
      />
      {ANNONCEMENT_MOCK.slice(0, 1).map((item, index) => (
        <StyledDiv key={index}>
          <Badge $width="50px">{item.urgency}</Badge>
          <P>{item.title}</P>
        </StyledDiv>
      ))}
    </ShadowBox>
  )
}

export default AnnouncementWidget

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
`
