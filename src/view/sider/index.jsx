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
    {
      title: "我的音乐",
      key: "music",
      selectable: false,
      children: [
        { name: "我的音乐云盘", id: "music-1" },
        { name: "我的收藏", id: "music-2" },
      ],
    },
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
        item.children = userSongList
      }
      return item
    })
    setMyMenuList(newList)
  }, [userSongList])
  const favClick = (item) => {
    navigate('/songlistdetail/'+item.id)
  }
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
                  {item.rightIcon ? item.rightIcon : null}
                </div>
                {item?.children?.map((i2) => (
                  <div
                    key={i2.id}
                    className="mymenu-item menu-list-item"
                    onClick={() => favClick(i2)}
                  >
                    {i2.name}
                  </div>
                ))}
              </div>
            ))
          : null}
      </div>
    </div>
  )
}
