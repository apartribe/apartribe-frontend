import WidgetTitleArea from 'components/common/WidgetTitleArea'
import React from 'react'
import { ShadowBox } from 'styles/reusable-style/elementStyle'
import { FaPeopleGroup } from 'react-icons/fa6'
import { GATHER_PEOPLE_MOCK } from 'mock/gatherPeopleData'
import { styled } from 'styled-components'
import { timeAgo } from 'utils/timeAgo'
import { useNavigate } from 'react-router-dom'

const GatherPeopleWidget = () => {
  const navigate = useNavigate()

  const moveToDetail = () => {
    navigate('/community/123/gather-people/45/detail') // 추후 경로 수정
  }

  return (
    <ShadowBox onClick={moveToDetail} $cursor="pointer">
      <WidgetTitleArea
        Icon={FaPeopleGroup}
        title="같이 하실 분 ~"
        hasSeeMore={true}
        seeMorePath="/community/123/gather-people"
      />
      {GATHER_PEOPLE_MOCK.filter((item) => item.state === '모집 중')
        .slice(0, 2)
        .map((item) => (
          <StyledWrapper key={item.title}>
            {' '}
            {/* 추후 아이디로 수정 */}
            <StyledImgWrapper>
              <StyledImg src={item.url} alt="" />
            </StyledImgWrapper>
            <StyledDiv className="column">
              <div>
                <StyledParagraph className="md">{item.title}</StyledParagraph>
                <StyledParagraph className="sm">{item.writer}</StyledParagraph>
                <StyledParagraph className="sm">{timeAgo(item.date)}</StyledParagraph>
              </div>
              <StyledParagraph className="sm">{item.explain}</StyledParagraph>
            </StyledDiv>
          </StyledWrapper>
        ))}
    </ShadowBox>
  )
}

export default GatherPeopleWidget

const StyledWrapper = styled.div`
  display: flex;
  height: auto;
  width: 100%;
  border-top: 1px solid #f2f2f2;
  padding: 10px;

  &:hover {
    img {
      transform: scale(1.1);
      transition: 0.1s ease-in-out;
    }
  }
`

const StyledImgWrapper = styled.div`
  min-width: 150px;
  max-height: 140px;
  border-radius: 5px;
  overflow: hidden;
`

const StyledImg = styled.img`
  width: 150px;
  height: 150px;
`

const StyledDiv = styled.div`
  display: flex;
  &.column {
    flex-direction: column;
    gap: 10px;
    padding: 15px;
  }

  &.end {
    justify-content: end;
    margin: 5px;
  }

  &.gap {
    gap: 5px;
  }
`

const StyledParagraph = styled.p`
  margin: 0;

  &.sm {
    font-size: 12px;
    display: flex;
    gap: 5px;
    align-items: center;
  }

  &.md {
    font-size: 15px;
    font-weight: 700;
  }

  &.lg {
    font-size: 20px;
  }

  &.xl {
    font-size: 30px;
    font-weight: 900;
  }

  &.bold {
    font-weight: 700;
  }

  &.mainColor {
    color: #2b7f75;
  }
`
