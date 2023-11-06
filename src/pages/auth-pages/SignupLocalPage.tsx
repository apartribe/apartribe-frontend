import { FormEvent, useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { Button } from 'styles/reusable-style/elementStyle'
import AuthLayout from 'components/auth/AuthLayout'
import SignupInputArea from 'components/auth/SignupInputArea'
import TermsAndConditionArea from 'components/auth/TermsAndConditionArea'
import { Message, SignupInputValue, TermsAndConditionsValue } from 'types/authType'
import MessageModal from 'components/common/MessageModal'
import { authService } from 'services/auth/authService'
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
  const [termsAndConditionsValue, setTermsAndConditionsValue] =
    useState<TermsAndConditionsValue>({
      goeFourteen: false,
      confirmCopyright: false,
      useAgree: false,
      dataCollectAgree: false,
      advertiseAgree: false,
    })

  const [isSignupPossible, setIsSignupPossible] = useState<boolean>(false)
  const [isSignupInputAreaValid, setIsSignupInputAreaValid] = useState<boolean>(false)

  const [modal, setModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<Message>({
    status: 'waiting',
    message: '',
  })

  useEffect(() => {
    const newValue = { ...termsAndConditionsValue }
    delete newValue.advertiseAgree

    const termsAndConditionsValueList = Object.values(newValue)
    const isTermsAndConditionsValueValid = termsAndConditionsValueList.reduce(
      (prev, current) => prev && current,
    )

    setIsSignupPossible(isSignupInputAreaValid && isTermsAndConditionsValueValid)
  }, [isSignupInputAreaValid, termsAndConditionsValue])

  const openModal = ({ status, message, goTo }: Message) => {
    setModal((prev) => !prev)
    setModalMessage({ status, message, goTo })
  }

  const submitSignupForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { result, message } = await authService.signup({
      ...inputValue,
      ...termsAndConditionsValue,
    })
    openModal({ status: result, message, goTo: PAGE_LOGIN })
  }

  return (
    <>
      <AuthLayout>
        <StyledH>회원가입</StyledH>
        <StyledForm onSubmit={submitSignupForm}>
          <SignupInputArea
            inputValue={inputValue}
            setInputValue={setInputValue}
            setIsSignupInputAreaValid={setIsSignupInputAreaValid}
          />
          <TermsAndConditionArea
            setTermsAndConditionsValue={setTermsAndConditionsValue}
          />
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
