import { FormEvent, MouseEvent } from 'react'
import { styled } from 'styled-components'
import { Button } from 'styles/reusable-style/elementStyle'
import AuthLayout from 'components/auth/AuthLayout'
import SignupInputArea from 'components/auth/SignupInputArea'
import TermsAndConditionArea from 'components/auth/TermsAndConditionArea'
import { useTimer } from 'hooks/useTimer'

const SignupLocalPage = () => {
  const { startTimer } = useTimer()
  const TIMER_SECONDS = 180

  const requestEmailAuth = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    startTimer(TIMER_SECONDS)
    //TODO: 서버 요청
  }

  const checkEmailAuth = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    //TODO: 서버 요청
  }

  const checkNickname = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    //TODO: 서버 요청
  }

  const signup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //TODO: 서버 요청
    console.log('{id, email, password, name, nickname}')
  }

  return (
    <AuthLayout>
      <StyledH>회원가입</StyledH>
      <StyledForm onSubmit={signup}>
        <SignupInputArea
          requestEmailAuth={requestEmailAuth}
          checkEmailAuth={checkEmailAuth}
          checkNickname={checkNickname}
        />
        <TermsAndConditionArea />
        <Button type="submit" disabled>
          회원가입
        </Button>
      </StyledForm>
    </AuthLayout>
  )
}

export default SignupLocalPage

const StyledH = styled.h1`
  display: flex;
  justify-content: center;
`

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`
