import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { aptService } from 'services/apt/aptService'
import { styled } from 'styled-components'
import { Button, P } from 'styles/reusable-style/elementStyle'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from 'react-icons/bi'

const CreateAptCommunityPage = () => {
  const navigate = useNavigate()

  // 사용자가 직접 주소로 접근한 경우, 아래 정보과 없으므로 에러발생. 추후 직접 접근 감시 로직 추가 요망
  const {
    state: { aptId: aptId = undefined, aptName: aptName = undefined },
  } = useLocation()

  const createAptCommunity = async () => {
    const { statusCode, message } = await aptService.createCommunity({ aptId, aptName })
    alert(message)
    if (statusCode === 201) return navigate(`/community/${aptId}`)
  }

  return (
    <Container $background="#FFFFFF">
      <Inner
        $height="calc(100vh - 50px)"
        $display="flex"
        $flexDirection="column"
        $justifyContent="center"
        $alignItems="center"
        $gap="40px"
      >
        <StyledParagraph>
          아직&nbsp;
          <BiSolidQuoteAltLeft />
          &nbsp; {aptName}&nbsp; <BiSolidQuoteAltRight />
          &nbsp;의 커뮤니티가 개설되지 않았네요.
        </StyledParagraph>
        <div>
          <StyledParagraph>절호의 기회!</StyledParagraph>
          <StyledParagraph>
            {'사용자1'}님, 지금 커뮤니티를 개설하시고, 창립 맴버 뱃지를 받아가세요!
          </StyledParagraph>
          <StyledParagraph>아래 버튼을 누르기만하면 생성이 완료됩니다.</StyledParagraph>
        </div>
        <Button $width="350px" onClick={createAptCommunity}>
          우리 아파트 커뮤니티 개설하기
        </Button>
      </Inner>
    </Container>
  )
}

export default CreateAptCommunityPage

const StyledDiv = styled.div``

const StyledParagraph = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`
