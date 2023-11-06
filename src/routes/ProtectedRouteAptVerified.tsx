import FlexibleModal from 'components/common/FlexibleModal'
import { useAppSelector } from 'hooks/useRedux'
import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: ReactNode
}

const ProtectedRouteAptVerified = ({ children }: Props) => {
  const userInfo = useAppSelector((state) => state.user.userInfo)
  const navigate = useNavigate()

  const noAptInfoModal = {
    text: `아파트 인증 후 이용 가능한 서비스 입니다.
    지금 인증 하시겠습니까?`,
    buttons: [
      { title: '뒤로 가기', action: () => navigate(-1) },
      { title: '아파트 인증', action: () => navigate('/setting/apartment-verification') },
    ],
  }

  return userInfo.apartCode === 'EMPTY' ? (
    <FlexibleModal modalProps={noAptInfoModal} />
  ) : (
    <>{children}</>
  )
}

export default ProtectedRouteAptVerified
