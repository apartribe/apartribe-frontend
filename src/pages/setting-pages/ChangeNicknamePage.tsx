import { useState, ChangeEvent, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import AuthLayout from 'components/auth/AuthLayout'
import SignupInput from 'components/auth/SignupInput'
import { signupValidation } from 'constants/auth/signupValidation'
import { Button } from 'styles/reusable-style/elementStyle'
import { PAGE_SETTING } from 'constants/setting/path'
import { userService } from 'services/auth/userService'
import MessageModal from 'components/common/MessageModal'
import { Message } from 'types/authType'
import { setLoginUser } from 'redux/store/userSlice'
import { useDispatch } from 'react-redux'

const ChangeNicknamePage = () => {
  const [newNickname, setNewNickname] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<Message>({
    status: 'waiting',
    message: '',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isNewNicknameValid = signupValidation.nickname.validator(newNickname)

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value)
  }

  const cancelChangeNickname = () => {
    setNewNickname('')
    navigate(PAGE_SETTING)
  }

  const openModal = ({ status, message, goTo }: Message) => {
    setModal((prev) => !prev)
    setModalMessage({ status, message, goTo })
  }

  const changeNickname = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isNewNicknameValid) return

    const { result, message } = await userService.updateNickname(newNickname)
    openModal({ status: result, message, goTo: PAGE_SETTING })

    if (result === 'success') {
      dispatch(setLoginUser({ nickname: newNickname }))
    }
  }

  return (
    <>
      <AuthLayout>
        <StyledH>닉네임 변경</StyledH>
        <StyledForm onSubmit={changeNickname}>
          <SignupInput
            labelText="새 닉네임"
            id="newNickname"
            type="text"
            name="newNickname"
            placeholder="새 닉네임을 입력해주세요"
            value={newNickname}
            onChange={changeInputValue}
            isValid={isNewNicknameValid}
          />
          <StyledDiv>
            <StyledCancelButton type="button" onClick={cancelChangeNickname}>
              취소
            </StyledCancelButton>
            <Button type="submit" disabled={!isNewNicknameValid}>
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

export default ChangeNicknamePage

const StyledH = styled.h2`
  display: flex;
  justify-content: center;
`

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
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
