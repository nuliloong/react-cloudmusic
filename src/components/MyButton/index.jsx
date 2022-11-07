import React from "react"
import { memo } from "react"
import "./index.less"

function MyButton(props) {
  const { children, icon, className, ...other } = props
  return (
    <button className={`my-button ${className}`} {...other}>
      {icon}
      {children}
    </button>
  )
}
export default memo(MyButton)