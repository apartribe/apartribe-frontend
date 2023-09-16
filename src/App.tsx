import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderLanding from 'components/common/HeaderLanding'
import Footer from 'components/common/Footer'

function App() {
  return (
    <>
      <HeaderLanding />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
