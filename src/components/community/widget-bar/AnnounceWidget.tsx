import WidgetTitleArea from 'components/community/widget-bar/WidgetTitleArea'
import React, { useEffect } from 'react'
import { Badge, P, ShadowBox } from 'styles/reusable-style/elementStyle'
import { HiSpeakerphone } from 'react-icons/hi'
import { ANNONCEMENT_MOCK } from 'mock/announcementData'
import { styled } from 'styled-components'
import Slider from 'react-slick'
import { useParams } from 'react-router-dom'
import { widgetService } from 'services/community/widgetSevice'

const AnnounceWidget = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    arrows: false,
  }

  const { aptId } = useParams()

  useEffect(() => {
    widgetService.getVaildAnnounce({ aptId: aptId as string })
  }, [])

  // level 과 category 관련 이슈 announceType.ts 주석 참고.
  const badgeColor = (category: string | undefined): string => {
    if (category === '일반') return '#0B2A08'
    if (category === '긴급') return '#C9AB0C'
    return '#EA1616'
  }

  return (
    <ShadowBox>
      <WidgetTitleArea
        Icon={HiSpeakerphone}
        title="치직.. 관리실에서 전파합니다."
        hasSeeMore={true}
        seeMorePath={`/community/${aptId}/announce`}
      />
      <Slider {...settings}>
        {ANNONCEMENT_MOCK.map((item, index) => (
          <div key={index}>
            <StyledDiv>
              <Badge $width="50px" $background={badgeColor(item.urgency)}>
                {item.urgency}
              </Badge>
              <StyledParagraph>{item.title}</StyledParagraph>
            </StyledDiv>
          </div>
        ))}
      </Slider>
    </ShadowBox>
  )
}

export default AnnounceWidget

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
`

const StyledParagraph = styled.p`
  line-height: 25px;
  font-size: 15px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  margin: 0;
`
