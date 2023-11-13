import { MouseEvent, useState } from 'react'
import FindPwForm from 'components/auth/FindPwForm'
import MessageModal from 'components/common/MessageModal'
import AuthLayout from 'components/auth/AuthLayout'
import { PAGE_LOGIN } from 'constants/auth/path'
import { FindPwInputValue, Message } from 'types/authType'
import { userService } from 'services/auth/userService'

const FindPwPage = () => {
  const [inputValue, setInputValue] = useState<FindPwInputValue>({ email: '', name: '' })
  const [modal, setModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<Message>({
    status: 'waiting',
    message: '',
  })

  const openModal = ({ status, message, goTo }: Message) => {
    setModal((prev) => !prev)
    setModalMessage({ status, message, goTo })
  }

  const findPw = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const { result, message } = await userService.findPw(inputValue)
    openModal({ status: result, message, goTo: PAGE_LOGIN })
  }

  return (
    <AuthLayout>
      <FindPwForm inputValue={inputValue} setInputValue={setInputValue} findPw={findPw} />
      {modal && (
        <MessageModal modal={modal} setModal={setModal} modalMessage={modalMessage} />
      )}
    </AuthLayout>
  )
}

export default FindPwPage
