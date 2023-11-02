import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const ProtectedRouteOnlyNotLoggedIn = ({ children }: Props) => {
  return <>{children}</>
}

export default ProtectedRouteOnlyNotLoggedIn
