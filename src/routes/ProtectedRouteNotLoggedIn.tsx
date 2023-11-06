import FlexibleModal from 'components/common/FlexibleModal'
import { useAppSelector } from 'hooks/useRedux'
import React, { ReactNode } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

interface Props {
  children: ReactNode
}

const ProtectedRouteNotLoggedIn = ({ children }: Props) => {
  const userInfo = useAppSelector((status) => status.user.userInfo)

  return userInfo === null ? <>{children}</> : <Navigate to="/" />
}

export default ProtectedRouteNotLoggedIn
