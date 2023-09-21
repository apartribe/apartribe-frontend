import AuthLayout from 'components/auth/AuthLayout'
import ResetPwForm from 'components/auth/ResetPwForm'
import ResetPwModal from 'components/auth/ResetPwModal'
import { MouseEvent, useState } from 'react'

const ResetPwPage = () => {
  const [modal, setModal] = useState<boolean>(false)

  const resetPw = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setModal((prev) => !prev)
  }

  //TODO: 서버응답 연결. 성공하면 navigate

  return (
    <AuthLayout>
      <ResetPwForm resetPw={resetPw} />
      {modal && <ResetPwModal modal={modal} />}
    </AuthLayout>
  )
}

export default ResetPwPage
