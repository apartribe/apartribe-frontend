import AuthLayout from 'components/auth/AuthLayout'
import ResetPwForm from 'components/auth/ResetPwForm'
import MessageModal from 'components/common/MessageModal'
import { PAGE_LOGIN } from 'constants/auth/path'
import { MouseEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { userService } from 'services/auth/userService'
import { Message, ResetPwInputValue } from 'types/authType'

const ResetPwPage = () => {
  const [searchParams] = useSearchParams()
  const identifier = searchParams.get('identifier')

  const [inputValue, setInputValue] = useState<ResetPwInputValue>({
    password: '',
    passwordConfirm: '',
    identifier: identifier as string,
  })
  const [modal, setModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<Message>({
    status: 'waiting',
    message: '',
  })

  const openModal = ({ status, message, goTo }: Message) => {
    setModal((prev) => !prev)
    setModalMessage({ status, message, goTo })
  }

  const resetPw = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const { result, message } = await userService.resetPw(inputValue)
    openModal({ status: result, message, goTo: PAGE_LOGIN })
  }

  return (
    <AuthLayout>
      <ResetPwForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        resetPw={resetPw}
      />
      {modal && (
        <MessageModal modal={modal} setModal={setModal} modalMessage={modalMessage} />
      )}
    </AuthLayout>
  )
}

export default ResetPwPage
