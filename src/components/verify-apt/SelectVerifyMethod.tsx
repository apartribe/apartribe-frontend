import React, { FC } from 'react'
import { styled } from 'styled-components'
import { Verification } from 'types/VerifyAptType'

interface Props {
  formValue: Verification
}

const SelectVerifyMethod: FC<Props> = ({ formValue }) => {
  return (
    <>
      <StyledH2>STEP4. 인증 수단 선택</StyledH2>
      <StyledParagraph className="helper">
        {' '}
        {`현재 서비스 개발중입니다.
        본 항목은 생략하고 진행하셔도 정상적으로 인증을 마치실 수 있습니다.`}{' '}
      </StyledParagraph>
      <StyledSection className="column">
        {formValue.userType === 'resident' && (
          <article>
            <input type="radio" name="residentVerifyMethod" id="docWhoLives" />
            <label htmlFor="docWhoLives">전입세대열람내역서로 인증하기</label>
            <input type="radio" name="residentVerifyMethod" id="parcel" />
            <label htmlFor="parcel"> 택배 송장 촬영 통해 인증하기</label>
            <input type="radio" name="residentVerifyMethod" id="office" />
            <label htmlFor="office"> 아파트 관리실을 통해 인증 인증하기</label>
          </article>
        )}

        {formValue.userType === 'manager' && (
          <article>
            <input type="radio" name="managerVerifyMethod" id="docWhoWorks" />
            <label htmlFor="docWhoWorks">재직증명서를 통해 인증하기</label>
            <input type="radio" name="managerVerifyMethod" id="parcel" />
            <label htmlFor="parcel">직장 이메일을 통해 인증하기</label>
          </article>
        )}
      </StyledSection>
    </>
  )
}

export default SelectVerifyMethod

const StyledH2 = styled.h2`
  margin: 0;
  line-height: 40px;
`

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  &.column {
    // 조건부 렌더링 하면 없애도 됨.
    flex-direction: column;
  }
`

const StyledParagraph = styled.p`
  margin: 0;

  &.helper {
    font-size: 12px;
    font-weight: 700;
    color: #2b7f75;
    white-space: pre-line;
  }
`
