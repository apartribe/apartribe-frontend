import FlexibleModal from 'components/common/FlexibleModal'
import { useAppSelector } from 'hooks/useRedux'
import React, { ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface Props {
  children: ReactNode
}

const ProtectedRoutePresentAptVerified = ({ children }: Props) => {
  const userInfo = useAppSelector((state) => state.user.userInfo)
  const navigate = useNavigate()
  const { aptId } = useParams()

  const notMyAptModal = {
    text: `인증하신 아파트 커뮤니티에만 게시물을 작성할 수 있습니다.`,
    buttons: [{ title: '확인', action: () => navigate(-1) }],
  }

  return userInfo?.apartCode === aptId ? (
    <>{children}</>
  ) : (
    <FlexibleModal modalProps={notMyAptModal} />
  )
}

export default ProtectedRoutePresentAptVerified
