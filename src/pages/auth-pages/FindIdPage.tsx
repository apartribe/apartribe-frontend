import { useState, MouseEvent } from 'react'
import AuthLayout from 'components/auth/AuthLayout'
import FindIdPwModal from 'components/auth/FindIdPwModal'
import FindIdPwForm from 'components/auth/FindIdPwForm'

const FindIdPage = () => {
  const [modal, setModal] = useState<boolean>(false)

  const findId = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setModal((prev) => !prev)
  }

  //TODO: 서버응답 연결. 성공하면 navigate, 실패하면 modal 닫기

  return (
    <AuthLayout>
      <FindIdPwForm findWhat="id" find={findId} />
      {modal && <FindIdPwModal modal={modal} setModal={setModal} />}
    </AuthLayout>
  )
}

export default FindIdPage
