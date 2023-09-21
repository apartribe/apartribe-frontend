import { FormEvent } from 'react'
import { styled } from 'styled-components'
import { Button } from 'styles/reusable-style/elementStyle'
import AuthLayout from 'components/auth/AuthLayout'
import SignupInputArea from 'components/auth/SignupInputArea'
import TermsAndConditionArea from 'components/auth/TermsAndConditionArea'

const SignupLocalPage = () => {
  const submitSignupForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //TODO: 조건따라서 회원가입 disabled 해제
    //signup()
  }

  return (
    <AuthLayout>
      <StyledH>회원가입</StyledH>
      <StyledForm onSubmit={submitSignupForm}>
        <SignupInputArea />
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
