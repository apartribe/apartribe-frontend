import { useState, ChangeEvent, MouseEvent } from 'react'
import { styled } from 'styled-components'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { Button } from 'styles/reusable-style/elementStyle'
import SignupInput from 'components/auth/SignupInput'
import { signupValidation } from 'constants/auth/signupValidation'
import { useTimer } from 'hooks/useTimer'
import { InputValue, PasswordType } from 'types/auth'

type SignupInputAreaProps = {
  requestEmailAuth: (e: MouseEvent<HTMLButtonElement>) => void
  checkEmailAuth: (e: MouseEvent<HTMLButtonElement>) => void
  checkNickname: (e: MouseEvent<HTMLButtonElement>) => void
}

const SignupInputArea = ({
  requestEmailAuth,
  checkEmailAuth,
  checkNickname,
}: SignupInputAreaProps) => {
  const [inputValue, setInputValue] = useState<InputValue>({
    email: '',
    code: '',
    password: '',
    passwordConfirm: '',
    name: '',
    nickname: '',
  })
  const [passwordType, setPasswordType] = useState<PasswordType>({
    type: 'password',
    visible: false,
  })
  const [passwordConfirmType, setPasswordConfirmType] = useState<PasswordType>({
    type: 'password',
    visible: false,
  })

  const { email, code, password, passwordConfirm, name, nickname } = inputValue

  const isEmailValid = signupValidation.email.validator(email)
  const isEmailAuthCodeValid = signupValidation.code.validator(code)
  const isPasswordValid = signupValidation.password.validator(password)
  const isPasswordConfirmValid = signupValidation.passwordConfirm.validator(
    password,
    passwordConfirm,
  )
  const isNicknameValid = signupValidation.nickname.validator(nickname)

  const { secondsLeft, formattedTimeLeft } = useTimer()

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
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
        <Button
          onClick={requestEmailAuth}
          disabled={!isEmailValid}
          $letterSpacing="normal"
        >
          인증요청
        </Button>
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
        <Button
          onClick={checkEmailAuth}
          disabled={!isEmailAuthCodeValid}
          $letterSpacing="normal"
        >
          인증
        </Button>
        {secondsLeft > 0 && (
          <StyledP className="waiting">
            이메일이 발송되었습니다. 3분 이내에 인증번호를 입력해주세요. 남은시간{' '}
            {formattedTimeLeft}
          </StyledP>
        )}
        {/* <StyledP className='success'>인증이 완료되었습니다.</StyledP>
          <StyledP className='fail'>이메일이 일치하지 않습니다. 다시 확인해주세요. 남은시간: 2:30</StyledP> */}
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
      />

      <SignupInput
        labelText="닉네임"
        info="커뮤니티에서 사용할 닉네임을 입력해주세요."
        id="nickname"
        name="nickname"
        value={nickname}
        onChange={changeInputValue}
        isValid={isNicknameValid}
        placeholder="닉네임을 입력하세요"
      >
        <Button
          onClick={checkNickname}
          disabled={!isNicknameValid}
          $letterSpacing="normal"
        >
          중복확인
        </Button>
        {/* <StyledP className='success'>사용 가능한 닉네임입니다.</StyledP>
          <StyledP className='fail'>이미 존재하는 닉네임입니다.</StyledP> */}
      </SignupInput>
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
