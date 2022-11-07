import React from "react"
import { Outlet } from "react-router-dom"
import "./index.less"
import { NavLink } from "react-router-dom"

export default function FindLayout() {
  console.log('1 :>> ', 1);
  const menuList = [
    { key: "findml-1", title: "个性推荐", path: "/find/personality" },
    { key: "findml-2", title: "专属定制", path: "/find/custom" },
    { key: "findml-3", title: "歌单", path: "/find/song_list" },
    { key: "findml-4", title: "排行榜", path: "/find/leaderboard" },
    { key: "findml-5", title: "歌手", path: "/find/singer" },
    { key: "findml-6", title: "最新音乐", path: "/find/new_song" },
  ]

  return (
    <div className="find">
      <div className="find-menu">
        <ul className="menu">
          {menuList.map((item) => (
            <NavLink className="menu-item" key={item.key} to={item.path}>
              {item.title}
            </NavLink>
          ))}
        </ul>
      </div>
      <div className="find-content">
        <Outlet></Outlet>
      </div>
    </div>
  )
}
