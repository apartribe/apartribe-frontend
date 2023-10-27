import React, { useState } from 'react'
import { styled } from 'styled-components'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import resident from 'assets/auth/resident.png'
import manager from 'assets/auth/manager.png'
import { Button } from 'styles/reusable-style/elementStyle'
import SelectAptModule from 'components/verify-apt/SelectApt'
import { Verification } from 'types/VerifyAptType'
import SelectUserType from 'components/verify-apt/SelectUserType'
import SelectPosition from 'components/verify-apt/SelectPosition'
import SelectVerifyMethod from 'components/verify-apt/SelectVerifyMethod'

export const CARD_CONTENTS = [
  {
    id: 'resident',
    badge: '아파트 인증 필요',
    image: resident,
    title: '집주인 · 입주민 · 청약권자',
    example: `“ 아파트에 소유하거나 거주하고 있음을 증명할 수 있어요! ”
    “ 청약에 당첨 되었어요! ”`,
    description: [
      '모든 게시물 열람 가능',
      '본인 아파트 커뮤니티 게시물 게재 가능',
      '타 아파트 페이지 게시물 열람 가능',
    ],
  },
  {
    id: 'manager',
    badge: '재직자 인증 필요',
    image: manager,
    title: '경비원 · 관리인 · 아파트 대표',
    example: `“ 경비원 · 관리인 재직 사실을 증명할 수 있어요 ! ”
“ 아파트 대표 · 동 대표로 활동하고 있어요 ! ”`,
    description: [
      '공지사항 게시물 업로드 권한 부여',
      '본인 아파트 커뮤니티 게시물 팝업 알림 가능',
      ' 닉네임과 함께 직책 공개 ex) [ 경비원 ] 참된 일꾼',
    ],
  },
]

export const RESIDENT_POSITIONS = ['자가', '임대인', '임차인', '청약권자']
export const MANAGER_POSITIONS = ['관리인', '경비원', '아파트 대표', '동 대표']

const VerifyAptPage = () => {
  const [formValue, setFormValue] = useState<Verification>({
    aptId: '',
    aptName: '',
    userType: '',
    position: '',
  })
  const { aptId, userType, position } = formValue

  const resetFormValue = () => {
    setFormValue({ aptId: '', aptName: '', userType: '', position: '' })
  }

  const hasEmptyValue = Object.values(formValue).includes('')

  const submitFormValue = () => {
    if (hasEmptyValue) {
      alert('작성되지 않은 항목이 있습니다. 다시 확인해주세요')
    } else alert('제출')
  }

  return (
    <Container $padding="30px">
      <Inner $padding="0 200px">
        <StyledH1>아파트 인증</StyledH1>

        <SelectAptModule setFormValue={setFormValue} />
        {aptId && <SelectUserType formValue={formValue} setFormValue={setFormValue} />}
        {userType && <SelectPosition formValue={formValue} setFormValue={setFormValue} />}
        {position && <SelectVerifyMethod formValue={formValue} />}

        <StyledSection>
          <Button onClick={resetFormValue}>초기화</Button>
          <Button
            $color={hasEmptyValue ? '#C8C8C8' : '#FFFFFF'}
            $background={hasEmptyValue ? '#B3B3B3' : '#2B7F75'}
            $cursor={hasEmptyValue ? 'not-allowed' : 'cursor'}
            onClick={submitFormValue}
          >
            제출
          </Button>
        </StyledSection>
      </Inner>
    </Container>
  )
}

export default VerifyAptPage

const StyledH1 = styled.h1`
  margin: 0;
  line-height: 100px;
`

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  margin: 50px 0;
  gap: 20px;
`
