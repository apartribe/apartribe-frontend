import { useState, ChangeEvent, MouseEvent } from 'react'
import { styled } from 'styled-components'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { Button } from 'styles/reusable-style/elementStyle'
import SignupInput from 'components/auth/SignupInput'
import { signupValidation } from 'constants/auth/signupValidation'
import { useTimer } from 'hooks/useTimer'

type inputValueState = {
  email: string
  emailAuthCode: string
  password1: string
  password2: string
  name: string
  nickname: string
}

type PasswordTypeState = {
  type: string
  visible: boolean
}

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
  const [inputValue, setInputValue] = useState<inputValueState>({
    email: '',
    emailAuthCode: '',
    password1: '',
    password2: '',
    name: '',
    nickname: '',
  })
  const [password1Type, setPassword1Type] = useState<PasswordTypeState>({
    type: 'password',
    visible: false,
  })
  const [password2Type, setPassword2Type] = useState<PasswordTypeState>({
    type: 'password',
    visible: false,
  })

  const { email, emailAuthCode, password1, password2, name, nickname } = inputValue

  const isEmailValid = signupValidation.email.validator(email)
  const isEmailAuthCodeValid = signupValidation.emailAuthCode.validator(emailAuthCode)
  const isNicknameValid = signupValidation.nickname.validator(nickname)

  const { secondsLeft, formattedTimeLeft } = useTimer()

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const changePasswordType = (e: MouseEvent<HTMLSpanElement>) => {
    //TODO: 선언적으로 시도하는 방식마다 에러나서 이모습인데 마음에 안든다;;
    if (e.currentTarget.id === 'password1Type') {
      setPassword1Type(
        password1Type.visible
          ? { type: 'password', visible: false }
          : { type: 'text', visible: true },
      )
    } else if (e.currentTarget.id === 'password2Type') {
      setPassword2Type(
        password2Type.visible
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
        id="emailAuthCode"
        name="emailAuthCode"
        value={emailAuthCode}
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
        id="password1"
        type={password1Type.type}
        name="password1"
        value={password1}
        onChange={changeInputValue}
        placeholder="영문, 숫자, 특수문자 혼합 8~20자"
        isValid={signupValidation.password1.validator(password1)}
        invalidMessage={signupValidation.password1.invalidMessage}
      >
        <StyledSpan id="password1Type" onClick={changePasswordType}>
          {!password1Type.visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </StyledSpan>
      </SignupInput>

      <SignupInput
        labelText="비밀번호 확인"
        id="password2"
        type={password2Type.type}
        name="password2"
        value={password2}
        onChange={changeInputValue}
        placeholder="비밀번호를 한 번 더 입력해주세요"
        isValid={signupValidation.password2.validator(password1, password2)}
        invalidMessage={signupValidation.password2.invalidMessage}
      >
        <StyledSpan id="password2Type" onClick={changePasswordType}>
          {!password2Type.visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
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
