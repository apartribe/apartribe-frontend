import { useState, useEffect, ChangeEvent, MouseEvent } from 'react'
import AuthLayout from 'components/auth/AuthLayout'
import SignupInput from 'components/auth/SignupInput'
import { styled } from 'styled-components'
import { Button } from 'styles/reusable-style/elementStyle'
import { ChangePwInputValue } from 'types/setting'
import { useNavigate } from 'react-router-dom'
import { PAGE_SETTING } from 'constants/setting/path'
import { user } from 'services/user'
import { signupValidation } from 'constants/auth/signupValidation'
import { Message } from 'types/auth'
import MessageModal from 'components/common/MessageModal'

const ChangePwPage = () => {
  const [inputValue, setInputValue] = useState<ChangePwInputValue>({
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
  })
  const [isChangePwPossible, setIsChangePwPossible] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<Message>({
    status: 'waiting',
    message: '',
  })

  const { password, newPassword, newPasswordConfirm } = inputValue
  const isNewPasswordValid = signupValidation.password.validator(newPassword)
  const isNewPasswordConfirmValid = signupValidation.passwordConfirm.validator(
    newPassword,
    newPasswordConfirm,
  )

  const navigate = useNavigate()

  useEffect(() => {
    setIsChangePwPossible(
      password.length !== 0 && isNewPasswordValid && isNewPasswordConfirmValid,
    )
  }, [password, isNewPasswordValid, isNewPasswordConfirmValid])

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const cancelChangePw = () => {
    setInputValue({ password: '', newPassword: '', newPasswordConfirm: '' })
    navigate(PAGE_SETTING)
  }

  const openModal = ({ status, message, goTo }: Message) => {
    setModal((prev) => !prev)
    setModalMessage({ status, message, goTo })
  }

  const changePw = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isChangePwPossible) return

    const { result, message } = await user.updatePassword(inputValue)
    openModal({ status: result, message, goTo: PAGE_SETTING })
  }

  return (
    <>
      <AuthLayout>
        <StyledH>비밀번호 변경</StyledH>
        <StyledForm onSubmit={changePw}>
          <SignupInput
            labelText="기존 비밀번호"
            id="password"
            type="password"
            name="password"
            placeholder="기존 비밀번호를 입력해주세요"
            value={password}
            onChange={changeInputValue}
          />
          <SignupInput
            labelText="새 비밀번호"
            id="newPassword"
            type="password"
            name="newPassword"
            placeholder="영문, 숫자, 특수문자 혼합 8~20자"
            value={newPassword}
            onChange={changeInputValue}
            isValid={isNewPasswordValid}
            invalidMessage={signupValidation.password.invalidMessage}
          />
          <SignupInput
            labelText="새 비밀번호 확인"
            id="newPasswordConfirm"
            type="password"
            name="newPasswordConfirm"
            placeholder="새 비밀번호를 한번 더 입력해주세요"
            value={newPasswordConfirm}
            onChange={changeInputValue}
            isValid={isNewPasswordConfirmValid}
            invalidMessage={signupValidation.passwordConfirm.invalidMessage}
          />
          <StyledDiv>
            <StyledCancelButton type="button" onClick={cancelChangePw}>
              취소
            </StyledCancelButton>
            <Button type="submit" disabled={!isChangePwPossible}>
              변경
            </Button>
          </StyledDiv>
        </StyledForm>
      </AuthLayout>
      {modal && (
        <MessageModal modal={modal} setModal={setModal} modalMessage={modalMessage} />
      )}
    </>
  )
}

export default ChangePwPage

const StyledH = styled.h2`
  display: flex;
  justify-content: center;
`

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  & > button {
    width: 100px;
    height: 50px;
  }
`

const StyledCancelButton = styled(Button)`
  background: #fff;
  color: #303030;
  border: 1px solid #dadada;
`
