import { ChangeEvent, MouseEvent, useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import SignupInput from 'components/auth/SignupInput'
import { PAGE_LOGIN } from 'constants/auth/path'
import { signupValidation } from 'constants/auth/signupValidation'
import { Button } from 'styles/reusable-style/elementStyle'
import { PasswordType, ResetPwInputValue } from 'types/auth'

type ResetPwFormProps = {
  resetPw: (e: MouseEvent<HTMLButtonElement>) => void
}

const ResetPwForm = ({ resetPw }: ResetPwFormProps) => {
  const [inputValue, setInputValue] = useState<ResetPwInputValue>({
    password: '',
    passwordConfirm: '',
  })
  const [passwordType, setPasswordType] = useState<PasswordType>({
    type: 'password',
    visible: false,
  })
  const [passwordConfirmType, setPasswordConfirmType] = useState<PasswordType>({
    type: 'password',
    visible: false,
  })

  const navigate = useNavigate()

  const { password, passwordConfirm } = inputValue

  const isPasswordValid = signupValidation.password.validator(password)
  const isPasswordConfirmValid = signupValidation.passwordConfirm.validator(
    password,
    passwordConfirm,
  )

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

  const cancelResetPw = () => {
    setInputValue({ password: '', passwordConfirm: '' })
    navigate(PAGE_LOGIN)
  }

  return (
    <>
      <StyledH>비밀번호 재설정</StyledH>
      <StyledForm>
        <SignupInput
          labelText="새 비밀번호 입력"
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
          labelText="새 비밀번호 입력"
          id="passwordConfirm"
          type={passwordConfirmType.type}
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={changeInputValue}
          placeholder="영문, 숫자, 특수문자 혼합 8~20자"
          isValid={isPasswordConfirmValid}
          invalidMessage={signupValidation.passwordConfirm.invalidMessage}
        >
          <StyledSpan id="passwordConfirmType" onClick={changePasswordType}>
            {!passwordConfirmType.visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </StyledSpan>
        </SignupInput>

        <StyledDiv>
          <StyledCancelButton onClick={cancelResetPw}>취소</StyledCancelButton>
          <Button type="submit" onClick={resetPw}>
            비밀번호 찾기
          </Button>
        </StyledDiv>
      </StyledForm>
    </>
  )
}

export default ResetPwForm

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

const StyledCancelButton = styled(Button)`
  background: #fff;
  color: #000;
  border: 1px solid #999;
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

const StyledDiv = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`
