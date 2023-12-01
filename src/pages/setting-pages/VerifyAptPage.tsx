import React, { useState } from 'react'
import { styled } from 'styled-components'
import { Container, Inner } from 'styles/reusable-style/layoutStyle'
import { Button } from 'styles/reusable-style/elementStyle'
import SelectAptModule from 'components/verify-apt/SelectApt'
import { Verification } from 'types/VerifyAptType'
import SelectUserType from 'components/verify-apt/SelectUserType'
import SelectPosition from 'components/verify-apt/SelectPosition'
import SelectVerifyMethod from 'components/verify-apt/SelectVerifyMethod'
import { aptService } from 'services/apt/aptService'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setLoginUser } from 'redux/store/userSlice'

const VerifyAptPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formValue, setFormValue] = useState<Verification>({
    aptId: '',
    aptName: '',
    userType: '',
    position: '',
  })

  const { aptId, aptName, userType, position } = formValue

  const resetFormValue = () => {
    setFormValue({ aptId: '', aptName: '', userType: '', position: '' })
  }

  const hasEmptyValue = Object.values(formValue).includes('')

  const submitFormValue = async () => {
    if (hasEmptyValue) {
      alert('작성되지 않은 항목이 있습니다. 다시 확인해주세요')
    } else {
      const statusCode = await aptService.verifyApt({
        aptId,
        aptName,
        userType,
        position,
      })
      if (statusCode === 200) {
        dispatch(
          setLoginUser({
            apartCode: aptId,
            apartName: aptName,
            userType,
            position,
            authStatus: '인증 완료',
          }),
        )
        toast.success('아파트 인증이 완료되었습니다.')
        navigate(`/`) // TODO: 추후에 아파트 존재하는지 확인하고 바로 보내줘도 좋을 듯
      }
    }
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
