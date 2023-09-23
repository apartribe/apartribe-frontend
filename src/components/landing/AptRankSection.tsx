import { APT_RANK_MOCK } from 'mock/aptRankData'
import React from 'react'
import { styled } from 'styled-components'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import AptRankCard from './AptRankCard'

const AptRankSection = () => {
  return (
    <Container>
      <Inner>
        <StyledWrapper>
          <StyledParagraph>지금 가장 핫한 아파트</StyledParagraph>
          <StyledDiv>
            {APT_RANK_MOCK.map((aptInfo, index) => (
              <AptRankCard key={index} index={index} aptInfo={aptInfo} />
            ))}
          </StyledDiv>
        </StyledWrapper>
      </Inner>
    </Container>
  )
}

export default AptRankSection

const StyledWrapper = styled.div`
  width: 100%;
  height: 430px;
  border-radius: 20px;
`

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
`

const StyledParagraph = styled.p`
  margin: 0;
  padding: 20px;
  font-size: 30px;
  font-weight: 900;
  color: #303030;
`
