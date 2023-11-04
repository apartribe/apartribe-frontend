import { useState, useEffect, ChangeEvent, MouseEvent, Dispatch } from 'react'
import { styled } from 'styled-components'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { Button } from 'styles/reusable-style/elementStyle'
import SignupInput from 'components/auth/SignupInput'
import { signupValidation } from 'constants/auth/signupValidation'
import { useTimer } from 'hooks/useTimer'
import { SignupInputValue, PasswordType, Message } from 'types/authType'
import { authService } from 'services/auth/authService'
import MessageModal from '../common/MessageModal'

type SigninupInputAreaProps<T> = {
  inputValue: T
  setInputValue: Dispatch<React.SetStateAction<T>>
  setIsSignupInputAreaValid: Dispatch<React.SetStateAction<boolean>>
}

const SignupInputArea = <T extends SignupInputValue>({
  inputValue,
  setInputValue,
  setIsSignupInputAreaValid,
}: SigninupInputAreaProps<T>) => {
  const [passwordType, setPasswordType] = useState<PasswordType>({
    type: 'password',
    visible: false,
  })
  const [passwordConfirmType, setPasswordConfirmType] = useState<PasswordType>({
    type: 'password',
    visible: false,
  })
  const [responseSuccessValues, setResponseSuccessValues] = useState({
    email: false,
    code: false,
    nickname: false,
  })
  const [confirmEmailResponseMessage, setConfirmEmailResponseMessage] = useState<Message>(
    {
      status: 'waiting',
      message: '',
    },
  )
  const [checkNicknameResponseMessage, setCheckNicknameResponseMessage] =
    useState<Message>({
      status: 'waiting',
      message: '',
    })
  const [modal, setModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<Message>({
    status: 'waiting',
    message: '',
  })

  const { email, code, password, passwordConfirm, name, nickname } = inputValue

  const isEmailValid = signupValidation.email.validator(email)
  const isEmailAuthCodeValid = signupValidation.code.validator(code)
  const isPasswordValid = signupValidation.password.validator(password)
  const isPasswordConfirmValid = signupValidation.passwordConfirm.validator(
    password,
    passwordConfirm,
  )
  const isNameValid = signupValidation.name.validator(name)
  const isNicknameValid = signupValidation.nickname.validator(nickname)

  const { startTimer, secondsLeft, resetTimer, formattedTimeLeft } = useTimer(
    '3분 이내에 인증번호를 입력해주세요. 남은시간:',
  )
  const TIMER_SECONDS = 180

  useEffect(() => {
    const isAllValueValid = isPasswordValid && isPasswordConfirmValid && isNameValid

    const responseSuccessList = Object.values(responseSuccessValues)
    const isAllResponseValueSuccess = responseSuccessList.reduce(
      (prev, current) => prev && current,
    )

    setIsSignupInputAreaValid(isAllValueValid && isAllResponseValueSuccess)
  }, [
    isPasswordValid,
    isPasswordConfirmValid,
    isNameValid,
    responseSuccessValues,
    setIsSignupInputAreaValid,
  ])

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const openModal = (status: 'waiting' | 'success' | 'fail', message: string) => {
    setModal((prev) => !prev)
    setModalMessage({ status, message })
  }

  const requestEmailAuth = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const { result, message } = await authService.sendEmail(email)
    openModal(result, message)

    if (result === 'success') {
      startTimer(TIMER_SECONDS)
      setConfirmEmailResponseMessage({
        status: 'waiting',
        message: formattedTimeLeft,
      })
      setResponseSuccessValues((prev) => ({ ...prev, email: true }))
    }
  }

  const confirmEmailAuth = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const { result, message } = await authService.confirmEmail(email, code)
    resetTimer()
    setConfirmEmailResponseMessage({ status: result, message: message })

    if (result === 'success') {
      setResponseSuccessValues((prev) => ({ ...prev, code: true }))
    }
  }

  const clickCheckNickname = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const { result, message } = await authService.checkNickname(nickname)
    setCheckNicknameResponseMessage({ status: result, message: message })

    if (result === 'success') {
      setResponseSuccessValues((prev) => ({ ...prev, nickname: true }))
    }
  }

  const changePasswordType = (e: MouseEvent<HTMLSpanElement>) => {
    if (e.currentTarget.id === 'passwordType') {
      setPasswordType(
        passwordType.visible
          ? { type: 'password', visible: false }
          : { type: 'text', visible: true },
      )
    } else if (e.currentTarget.id === 'passwordConfirmType') {
      setPasswordConfirmType(
        passwordConfirmType.visible
          ? { type: 'password', visible: false }
          : { type: 'text', visible: true },
      )
    }
  }

  return (
    <>
      <SignupInput
        labelText="이메일"
        id="email"
        name="email"
        value={email}
        onChange={changeInputValue}
        placeholder="id@email.com"
        isValid={isEmailValid}
        invalidMessage={signupValidation.email.invalidMessage}
      >
        <StyledButton onClick={requestEmailAuth} disabled={!isEmailValid}>
          인증요청
        </StyledButton>
      </SignupInput>

      <SignupInput
        labelText="인증번호 확인"
        id="code"
        name="code"
        value={code}
        onChange={changeInputValue}
        placeholder="인증번호를 입력하세요"
        isValid={isEmailAuthCodeValid}
      >
        <StyledButton onClick={confirmEmailAuth} disabled={!isEmailAuthCodeValid}>
          인증
        </StyledButton>
        <StyledP className={confirmEmailResponseMessage.status}>
          {secondsLeft > 0 ? formattedTimeLeft : confirmEmailResponseMessage.message}
        </StyledP>
      </SignupInput>

      <SignupInput
        labelText="비밀번호"
        id="password"
        type={passwordType.type}
        name="password"
        value={password}
        onChange={changeInputValue}
        placeholder="영문, 숫자, 특수문자 혼합 8~20자"
        isValid={isPasswordValid}
        invalidMessage={signupValidation.password.invalidMessage}
      >
        <StyledSpan id="passwordType" onClick={changePasswordType}>
          {!passwordType.visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </StyledSpan>
      </SignupInput>

      <SignupInput
        labelText="비밀번호 확인"
        id="passwordConfirm"
        type={passwordConfirmType.type}
        name="passwordConfirm"
        value={passwordConfirm}
        onChange={changeInputValue}
        placeholder="비밀번호를 한 번 더 입력해주세요"
        isValid={isPasswordConfirmValid}
        invalidMessage={signupValidation.passwordConfirm.invalidMessage}
      >
        <StyledSpan id="passwordConfirmType" onClick={changePasswordType}>
          {!passwordConfirmType.visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </StyledSpan>
      </SignupInput>

      <SignupInput
        labelText="이름"
        info="실명은 회원 관리용으로만 사용되며 커뮤니티 활동시에는 사용되지 않습니다."
        id="name"
        name="name"
        value={name}
        onChange={changeInputValue}
        placeholder="이름을 입력하세요"
        isValid={isNameValid}
      />

      <SignupInput
        labelText="닉네임"
        info="커뮤니티에서 사용할 닉네임을 입력해주세요."
        id="nickname"
        name="nickname"
        value={nickname}
        onChange={changeInputValue}
        placeholder="닉네임을 입력하세요"
        isValid={isNicknameValid}
      >
        <StyledButton onClick={clickCheckNickname} disabled={!isNicknameValid}>
          중복확인
        </StyledButton>
        <StyledP className={checkNicknameResponseMessage.status}>
          {checkNicknameResponseMessage.message}
        </StyledP>
      </SignupInput>

      {modal && (
        <MessageModal modal={modal} setModal={setModal} modalMessage={modalMessage} />
      )}
    </>
  )
}

export default SignupInputArea

const StyledP = styled.p`
  grid-column: 1 / span 10;
  grid-row: 2;
  font-size: small;
  margin-right: auto;
  margin-top: 0;
  margin-bottom: 0;
  color: ${(props) => {
    if (props.className === 'success') return 'green'
    else if (props.className === 'waiting') return '#303030'
    else if (props.className === 'fail') return '#EA1616'
  }};
`

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  color: #303030;
  padding: 10px;
  cursor: pointer;
  font-size: 20px;
  grid-column: 10 / span 1;
  grid-row: 1;
`

const StyledButton = styled(Button)`
  letter-spacing: normal;
  font-size: 15px;
`
