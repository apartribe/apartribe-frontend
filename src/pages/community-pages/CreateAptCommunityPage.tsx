import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { aptService } from 'services/apt/aptService'
import { styled } from 'styled-components'
import { Button } from 'styles/reusable-style/elementStyle'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from 'react-icons/bi'
import Confetti from 'components/common/effect/Confetti'
import FlexibleModal from 'components/common/FlexibleModal'
import { useAppSelector } from 'hooks/useRedux'

const CreateAptCommunityPage = () => {
  const navigate = useNavigate()
  const userInfo = useAppSelector((state) => state.user.userInfo)
  const [visibleModal, setVisibleModal] = useState(false)

  // 사용자가 직접 주소로 접근한 경우, 아래 정보가 없으므로 에러발생. 추후 직접 접근 감시 로직 추가 요망
  const {
    state: { aptId: aptId = undefined, aptName: aptName = undefined },
  } = useLocation()

  const createAptCommunity = async () => {
    const statusCode = await aptService.createCommunity({ aptId, aptName })
    if (statusCode === 201) {
      setVisibleModal(true)
    }
  }

  const modalProps = {
    text: `" ${aptName} "의 커뮤니티가 성공적으로 개설되었습니다 !`,
    buttons: [
      { title: '홈으로 돌아가기', action: () => navigate('/') },
      { title: '커뮤니티 바로가기', action: () => navigate(`/community/${aptId}`) },
    ],
  }

  const forNotVerifiedUser = (
    <>
      <div>
        <StyledParagraph>절호의 기회!</StyledParagraph>
        <StyledParagraph>
          지금 아파트를 인증하시면 커뮤니티를 개설하실 수 있어요!
        </StyledParagraph>
      </div>
      <Button $width="250px" onClick={() => navigate('/setting/apartment-verification')}>
        아파트 인증하기
      </Button>
    </>
  )

  const forOtherAptUser = (
    <>
      <div>
        <StyledParagraph>
          커뮤니티는 해당 아파트의 주민만 개설할 수 있습니다.
        </StyledParagraph>
        <StyledParagraph>
          아쉽지만, 커뮤니티가 개설되면 다시 찾아주시겠어요?
        </StyledParagraph>
      </div>
      <Button $width="200px" onClick={() => navigate(-1)}>
        뒤로 가기
      </Button>
    </>
  )

  const forVerifiedUser = (
    <>
      <div>
        <StyledParagraph>절호의 기회!</StyledParagraph>
        <StyledParagraph>
          {userInfo?.nickname}님, 지금 커뮤니티를 개설하시고, 창립 맴버 뱃지를 받아가세요!
        </StyledParagraph>
        <StyledParagraph>아래 버튼을 누르기만하면 생성이 완료됩니다.</StyledParagraph>
      </div>
      <Button $width="350px" onClick={createAptCommunity}>
        우리 아파트 커뮤니티 개설하기
      </Button>
    </>
  )

  const decideContents = () => {
    if (userInfo?.apartCode === aptId) return forVerifiedUser
    if (userInfo === null || userInfo?.apartCode === 'EMPTY') return forNotVerifiedUser
    return forOtherAptUser
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
        {decideContents()}
        {visibleModal ? (
          <>
            <FlexibleModal modalProps={modalProps} noBackground />
            <Confetti />
          </>
        ) : (
          ''
        )}
      </Inner>
    </Container>
  )
}

export default CreateAptCommunityPage

const StyledParagraph = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`
