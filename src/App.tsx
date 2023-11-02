import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderLanding from 'components/common/HeaderLanding'
import Footer from 'components/common/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <HeaderLanding />
      <Outlet />
      <Footer />
      <ToastContainer
        toastStyle={{
          boxShadow: 'none',
          backgroundColor: '#303030',
          color: '#ffffff',
          fontSize: '12px',
        }}
      />
    </>
  )
}

export default App
