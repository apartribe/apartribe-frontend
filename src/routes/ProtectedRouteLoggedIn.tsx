import FlexibleModal from 'components/common/FlexibleModal'
import { useAppSelector } from 'hooks/useRedux'
import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: ReactNode
}

const ProtectedRouteLoggedIn = ({ children }: Props) => {
  const navigate = useNavigate()

  const userInfo = useAppSelector((status) => status.user.userInfo)

  const notLoggedInModal = {
    text: `로그인 후 이용할 수 있는 서비스입니다.
    지금 로그인 하시겠습니까?`,
    buttons: [
      { title: '뒤로 가기', action: () => navigate(-1) },
      { title: '로그인', action: () => navigate('/login') },
    ],
  }

  return userInfo.email === '' ? (
    <FlexibleModal modalProps={notLoggedInModal} />
  ) : (
    <>{children}</>
  )
}

export default ProtectedRouteLoggedIn
