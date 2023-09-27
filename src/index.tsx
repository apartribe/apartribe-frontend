import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from 'routes/Router'
import { AuthProvider } from 'contexts/AuthContext'
import { LocalStorage } from 'configs/LocalStorage'
import { HttpClient } from 'configs/HttpClient'
import { AuthService } from 'services/AuthService'

const root = createRoot(document.getElementById('root') as HTMLElement)

const BASE_URL = 'http://ec2-15-165-196-198.ap-northeast-2.compute.amazonaws.com:8080'

const localStorage = new LocalStorage()
const httpClient = new HttpClient(BASE_URL, localStorage)

const authService = new AuthService(httpClient, localStorage)

root.render(
  <React.StrictMode>
    <AuthProvider authService={authService}>
      <RouterProvider router={Router} />
    </AuthProvider>
  </React.StrictMode>,
)
