import { MouseEvent, useState } from 'react'
import AuthLayout from 'components/auth/AuthLayout'
import FindIdPwModal from 'components/auth/FindIdPwModal'
import FindIdPwForm from 'components/auth/FindIdPwForm'

const FindPwPage = () => {
  const [modal, setModal] = useState<boolean>(false)

  const findPw = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setModal((prev) => !prev)
  }

  return (
    <AuthLayout>
      <FindIdPwForm findWhat="password" find={findPw} />
      {modal && <FindIdPwModal modal={modal} setModal={setModal} />}
    </AuthLayout>
  )
}

export default FindPwPage
