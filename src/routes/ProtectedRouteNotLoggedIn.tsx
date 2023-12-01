import { useAppSelector } from 'hooks/useRedux'
import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
  children: ReactNode
}

const ProtectedRouteNotLoggedIn = ({ children }: Props) => {
  const userInfo = useAppSelector((status) => status.user.userInfo)

  return userInfo.email === '' ? <>{children}</> : <Navigate to="/" />
}

export default ProtectedRouteNotLoggedIn
