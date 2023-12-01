import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const ProtectedRouteOnlyManager = ({ children }: Props) => {
  return <>{children}</>
}

export default ProtectedRouteOnlyManager
