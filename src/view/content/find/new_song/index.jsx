import React from "react"
import { memo } from "react"
import "./index.less"
import classNames from "classnames"
import { useNavigate, useLocation, Outlet } from "react-router-dom"
import { NavLink } from "react-router-dom"

function NewSong() {
  const navigateTo = useNavigate()
  const { pathname } = useLocation()
  const menu = [
    { name: "新歌速递", path: "/find/new_song/top_music" },
    { name: "新碟上架", path: "/find/new_song/top_album" },
  ]

  return (
    <div className="newsong">
      <div className="newsong-class">
        <div className="border">
          {menu.map((item) => (
            <NavLink className="button" key={item.path} to={item.path}>
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  )
}
export default memo(NewSong)
