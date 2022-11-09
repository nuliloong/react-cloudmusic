import React from "react"
import "./index.less"

export default function Theme() {
  const themeList = [
    { name: "官方红", className: "theme-red", color: "#ec4141" },
    { name: "可爱粉", className: "theme-pink", color: "#FF5C8A" },
    { name: "天际蓝", className: "theme-blue", color: "#39AFEA" },
    { name: "清晰绿", className: "theme-green", color: "#2BB669" },
    { name: "土豪金", className: "theme-golden", color: "#E2AB12" },
    { name: "友谊紫", className: "theme-purple", color: "#A106E9" },
  ]

  const changeTheme = (className) => {
    document.body.classList = [className]
    localStorage.setItem("theme-color", className)
  }
  return (
    <div className="theme-popover">
      {themeList.map((item) => (
        <div
          key={item.className}
          className="theme-popover-item"
          style={{ backgroundColor: item.color }}
          onClick={() => changeTheme(item.className)}
        >
          <div className="name">{item.name}</div>
        </div>
      ))}
    </div>
  )
}
