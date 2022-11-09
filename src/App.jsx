import React from "react"
import Router from "@/routers/index"
import { HashRouter } from "react-router-dom"
import AuthRouter from "@/routers/utils/authRouter"
import { useSelector } from "react-redux"
import lazyLoad from "./routers/utils/lazyLoad"

const LoginModal = ({ userId }) => {
  if (userId) return
  return lazyLoad(React.lazy(() => import("@v/login")))
}

function App() {
  // 使用默认主题色
  document.body.classList = [localStorage.getItem("theme-color") || "theme-red"]

  const userId = useSelector(({ user }) => user.userId)
  return (
    <HashRouter>
      <AuthRouter>
        <Router />
      </AuthRouter>
      <LoginModal userId={userId} />
    </HashRouter>
  )
}

export default App
