import WidgetTitleArea from 'components/community/widget-bar/WidgetTitleArea'
import React, { useEffect, useState } from 'react'
import { Badge, ShadowBox } from 'styles/reusable-style/elementStyle'
import { HiSpeakerphone } from 'react-icons/hi'
import { styled } from 'styled-components'
import Slider from 'react-slick'
import { useNavigate, useParams } from 'react-router-dom'
import { widgetService } from 'services/community/widgetSevice'
import { VaildAnnounce } from 'types/community-type/widgetType'

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
  const navigate = useNavigate()

  const [vaildAnnounceList, setVaildAnnounceList] = useState<VaildAnnounce[] | null>(null)

  useEffect(() => {
    const getVaildAnnounce = async () => {
      const response = await widgetService.getVaildAnnounce({ aptId: aptId as string })
      setVaildAnnounceList(response.data)
    }

    getVaildAnnounce()
  }, [aptId])

  const moveToDetail = (postId: number) => {
    navigate(`/community/${aptId}/announce/${postId}/detail`)
  }

  const badgeColor = (level: string | undefined): string => {
    if (level === '일반') return '#0B2A08'
    if (level === '긴급') return '#C9AB0C'
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
      {vaildAnnounceList?.length === 0 ? (
        <StyledParagraph className="noData">
          현재 게시중인 공지사항이 없습니다.
        </StyledParagraph>
      ) : (
        <Slider {...settings}>
          {vaildAnnounceList?.map(({ id, level, title }: VaildAnnounce) => (
            <div key={id}>
              <StyledDiv onClick={() => moveToDetail(id)}>
                <Badge $width="50px" $background={badgeColor(level)}>
                  {level}
                </Badge>
                <StyledParagraph>{title}</StyledParagraph>
              </StyledDiv>
            </div>
          ))}
        </Slider>
      )}
    </ShadowBox>
  )
}

export default AnnounceWidget

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 10px;
  cursor: pointer;
`

const StyledParagraph = styled.p`
  line-height: 26px;
  font-size: 15px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  margin: 0;

  &.noData {
    line-height: 20px;
    font-size: 12px;
    padding-left: 30px;
  }
`
