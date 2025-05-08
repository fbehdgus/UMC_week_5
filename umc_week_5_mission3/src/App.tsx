import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {createBrowserRouter, RouteObject, RouterProvider} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Errorpage from './pages/ErrorPage'
import LoginPage from './pages/LoginPage'
import HomeLayout from './layouts/HomeLayout'
import SignupPage from './pages/SignupPage'
import MyPage from './pages/MyPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedLayout from './layouts/ProtectedLayout'
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage'


//public route 인증 없이 접근 가능한 놈


const publicRoutes:RouteObject = [
  
    {
      path: "/",
      element: <HomeLayout/>,
      errorElement: <div>40404</div>,
      children:[
        {path: "/", element: <HomePage/>},
        {path: "signin", element: <LoginPage/>},
        {path: "signup", element: <SignupPage/>},
        {path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage/>},

      ]
    },
  
]




//protected route 인증이 필요한 놈

const protectedRoutes:RouteObject = [{

  path:"/",
  element: <ProtectedLayout/>,
  errorElement: <div>40404</div>,
  children:[
    { path: "mypage", element: <MyPage/>},
  ]

},

]



function App() {
  

  const router = createBrowserRouter([...publicRoutes,...protectedRoutes], );



  return (
    <>
    

    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>

    </>
  )
}

export default App
