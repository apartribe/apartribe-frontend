import { FormEvent, useState } from 'react'
import { styled } from 'styled-components'
import { Button } from 'styles/reusable-style/elementStyle'
import AuthLayout from 'components/auth/AuthLayout'
import SignupInputArea from 'components/auth/SignupInputArea'
import TermsAndConditionArea from 'components/auth/TermsAndConditionArea'
import { Message, SignupInputValue } from 'types/auth'
import MessageModal from 'components/common/MessageModal'
import { auth } from 'services/auth'
import { useNavigate } from 'react-router-dom'
import { PAGE_LOGIN } from 'constants/auth/path'

const SignupLocalPage = () => {
  const [inputValue, setInputValue] = useState<SignupInputValue>({
    email: '',
    code: '',
    password: '',
    passwordConfirm: '',
    name: '',
    nickname: '',
  })
  const [isSignupPossible, setIsSignupPossible] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<Message>({
    status: 'waiting',
    message: '',
  })

  const navigate = useNavigate()

  const openModal = (status: 'waiting' | 'success' | 'fail', message: string) => {
    setModal((prev) => !prev)
    setModalMessage({ status, message })
  }

  const submitSignupForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { result, message } = await auth.signup(inputValue)
    openModal(result, message)

    if (result === 'success') {
      navigate(PAGE_LOGIN)
    }
  }

  return (
    <>
      <AuthLayout>
        <StyledH>회원가입</StyledH>
        <StyledForm onSubmit={submitSignupForm}>
          <SignupInputArea
            inputValue={inputValue}
            setInputValue={setInputValue}
            setIsSignupPossible={setIsSignupPossible}
          />
          <TermsAndConditionArea />
          <Button type="submit" disabled={!isSignupPossible}>
            회원가입
          </Button>
        </StyledForm>
      </AuthLayout>
      {modal && (
        <MessageModal modal={modal} setModal={setModal} modalMessage={modalMessage} />
      )}
    </>
  )
}

export default SignupLocalPage

const StyledH = styled.h2`
  display: flex;
  justify-content: center;
`

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;
`
