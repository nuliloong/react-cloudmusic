import React from 'react'
import Router from "@/routers/index";
import { HashRouter } from "react-router-dom";
import AuthRouter from "@/routers/utils/authRouter";
import { useSelector } from 'react-redux';
import lazyLoad from './routers/utils/lazyLoad';
// import LoginModal from "@v/login"




function App() {
  const userId = useSelector(({user})=>user.userId)
  const LoginModal = ()=>{
    if (userId) return
    return lazyLoad(React.lazy(() => import("@v/login")))
  }
  
  return (
    <HashRouter>
      <AuthRouter>
        <Router />
      </AuthRouter>
      <LoginModal />
    </HashRouter>
  )
}

export default App
