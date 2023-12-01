import React from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'
import HeaderLanding from 'components/common/HeaderLanding'
import Footer from 'components/common/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { setAccessToken, setRefreshToken } from 'utils/localStorage'
import { userService } from 'services/auth/userService'
import { useDispatch } from 'react-redux'
import { setLogin } from 'redux/store/userSlice'
import { ResultWithData } from 'types/authType'

function App() {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()

  const thirdPartyAccessToken = searchParams?.get('accessToken')
  const thirdPartyRefreshToken = searchParams?.get('refreshToken')

  if (thirdPartyAccessToken) setAccessToken(thirdPartyAccessToken)
  if (thirdPartyRefreshToken) setRefreshToken(thirdPartyRefreshToken)

  const showMember = async () => {
    if (!thirdPartyAccessToken || !thirdPartyRefreshToken) return
    const showMemberResult = await userService.showMember()
    const { result, data } = showMemberResult as ResultWithData

    if (result === 'success') {
      dispatch(setLogin(data))
    }
  }

  showMember()

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
