import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const ProtectedRoutePresentAptVerified = ({ children }: Props) => {
  return <>{children}</>
}

export default ProtectedRoutePresentAptVerified
