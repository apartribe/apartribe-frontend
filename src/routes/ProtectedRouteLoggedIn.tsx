import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const ProtectedRouteLoggedIn = ({ children }: Props) => {
  return <>{children}</>
}

export default ProtectedRouteLoggedIn
