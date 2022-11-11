import React from "react"
import "./index.less"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { PlusOutlined } from "@ant-design/icons"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Sider() {
  const userId = useSelector(({ user }) => user.userId)
  const userSongList = useSelector(({ user }) => user.userSongList)
  const navigate = useNavigate()
  const [myMenuList, setMyMenuList] = useState([
    // {
    //   title: "我的音乐",
    //   key: "music",
    //   selectable: false,
    //   children: [
    //     { name: "我的音乐云盘", id: "music-1", path: "/mymusicclound" },
    //     { name: "我的收藏", id: "music-2", path: "/mycollect" },
    //   ],
    // },
    {
      title: "创建歌单",
      key: "favorites",
      selectable: false,
      rightIcon: <PlusOutlined />,
      children: [],
    },
  ])

  useEffect(() => {
    const newList = myMenuList.map((item) => {
      if (item.key === "favorites") {
        item.children = userSongList.map((i) => ({ ...i, path: "/songlistdetail/" + i.id }))
      }
      return item
    })
    setMyMenuList(newList)
  }, [userSongList])
  const menuList = [
    { title: "发现音乐", path: "/find" },
    { title: "播客", path: "/dj" },
    { title: "视频", path: "/video" },
    { title: "关注", path: "/follow" },
    { title: "直播", path: "/live" },
    { title: "私人FM", path: "/private_fm" },
  ]
  return (
    <div className="menu-container scrollbar-hover">
      <div className="menu-list">
        {menuList.map((item) => (
          <NavLink className="menu-list-item" key={item.path} to={item.path}>
            {item.title}
          </NavLink>
        ))}
      </div>
      <div>
        {userId
          ? myMenuList.map((item) => (
              <div key={item.key} className="mymenu">
                <div className="mymenu-title">
                  <div>{item.title}</div>
                  {/* {item.rightIcon ? item.rightIcon : null} */}
                </div>
                {item?.children?.map((i2) => (
                  <NavLink key={i2.id} className="mymenu-item menu-list-item" to={i2.path}>
                    {i2.name}
                  </NavLink>
                ))}
              </div>
            ))
          : null}
      </div>
    </div>
  )
}
