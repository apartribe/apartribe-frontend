import React, { FC } from 'react'
import { styled } from 'styled-components'
import { Img } from 'styles/reusable-style/elementStyle'
import { TogetherDetailType } from 'types/community-type/togetherType'

interface Props {
  data: TogetherDetailType
}

const DetailInfoSection: FC<Props> = ({
  data: {
    thumbnail,
    recruitFrom,
    recruitTo,
    meetTime,
    target,
    location,
    contributeStatus,
    recruitStatus,
  },
}) => {
  return (
    <>
      <br />
      <Img src={thumbnail} $borderRadius="20px" />
      <StyledWrapper>
        <StyledDiv>
          <StyledParagraph className="title">모집 기간 : </StyledParagraph>
          <StyledParagraph>
            {`${recruitFrom.slice(0, 10)} ~ ${recruitTo.slice(0, 10)}`}&nbsp;&nbsp;(
            {recruitStatus})
          </StyledParagraph>
        </StyledDiv>
        <StyledDiv>
          <StyledParagraph className="title">활동 시간 : </StyledParagraph>
          <StyledParagraph>{meetTime}</StyledParagraph>
        </StyledDiv>
        <StyledDiv>
          <StyledParagraph className="title">활동 장소 : </StyledParagraph>
          <StyledParagraph>{location}</StyledParagraph>
        </StyledDiv>
        <StyledDiv>
          <StyledParagraph className="title">모집 대상 : </StyledParagraph>
          <StyledParagraph>{target}</StyledParagraph>
        </StyledDiv>
        <StyledDiv>
          <StyledParagraph className="title">참가 비용 및 회비 여부 : </StyledParagraph>
          <StyledParagraph>{contributeStatus ? '있음' : '없음'}</StyledParagraph>
        </StyledDiv>
      </StyledWrapper>
    </>
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
