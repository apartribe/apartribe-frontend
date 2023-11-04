import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from 'routes/Router'
import { Provider } from 'react-redux'
import { authService } from 'services/auth/authService'
import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from 'utils/localStorage'
import { store, persistor } from 'redux/store'
import { PersistGate } from 'redux-persist/integration/react'

const root = createRoot(document.getElementById('root') as HTMLElement)

const reIssue = async () => {
  const timer = setInterval(() => {
    if (!getRefreshToken()) return
    authService.reissueToken()
  }, 1000000) // 16 분 40초 (안전하게 20분 되기 이전에 미리 수행)
  return () => {
    clearInterval(timer)
  }
}

reIssue()

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={Router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
