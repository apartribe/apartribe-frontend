import React, { FC } from 'react'
import { styled } from 'styled-components'

interface DetailInfoData {
  startDate: string
  endDate: string
  time: string
  place: string
  target: string
  dues: string
}

interface Props {
  data: DetailInfoData
}

const DetailInfoSection: FC<Props> = ({
  data: { startDate, endDate, time, place, target, dues },
}) => {
  return (
    <StyledWrapper>
      <StyledDiv>
        <StyledParagraph className="title">모집 기간 : </StyledParagraph>
        <StyledParagraph>{`${startDate.slice(0, 10)} ~ ${endDate.slice(
          0,
          10,
        )}`}</StyledParagraph>
      </StyledDiv>
      <StyledDiv>
        <StyledParagraph className="title">활동 시간 : </StyledParagraph>
        <StyledParagraph>{time}</StyledParagraph>
      </StyledDiv>
      <StyledDiv>
        <StyledParagraph className="title">활동 장소 : </StyledParagraph>
        <StyledParagraph>{place}</StyledParagraph>
      </StyledDiv>
      <StyledDiv>
        <StyledParagraph className="title">모집 대상 : </StyledParagraph>
        <StyledParagraph>{target}</StyledParagraph>
      </StyledDiv>
      <StyledDiv>
        <StyledParagraph className="title">참가 비용 및 회비 여부 : </StyledParagraph>
        <StyledParagraph>{dues}</StyledParagraph>
      </StyledDiv>
    </StyledWrapper>
  )
}

export default DetailInfoSection

const StyledWrapper = styled.div`
  margin: 20px 0;
  padding: 20px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  background: rgba(235, 235, 235, 0.5);
  box-shadow: inset 4px 4px 10px 0px rgba(0, 0, 0, 0.25);
`

const StyledDiv = styled.div`
  display: flex;
  gap: 10px;
`

const StyledParagraph = styled.p`
  &.title {
    font-weight: 700;
  }
`
