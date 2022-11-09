import React from "react"
import "./index.less"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { PlusOutlined } from "@ant-design/icons"

export default function Sider() {
  const userId = useSelector(({ user }) => user.userId)
  const menuList = [
    { title: "发现音乐", path: "/find" },
    { title: "播客", path: "/dj" },
    { title: "视频", path: "/video" },
    { title: "关注", path: "/follow" },
    { title: "直播", path: "/live" },
    { title: "私人FM", path: "/private_fm" },
  ]
  const myMenuList = [
    {
      title: "我的音乐",
      key: "music",
      selectable: false,
      children: [
        // { title: "本地与下载", key: "music-1" },
        // { title: "最近播放", key: "music-2" },
        { title: "我的音乐云盘", key: "music-3" },
        // { title: "我的播客", key: "music-4" },
        { title: "我的收藏", key: "music-5" },
      ],
    },
    {
      title: "创建歌单",
      key: "favorites",
      selectable: false,
      rightIcon: <PlusOutlined />,
      children: [
        { title: "我喜欢的音乐", key: "favorites-1" },
        { title: "歌单1", key: "favorites-2" },
        { title: "歌单2", key: "favorites-3" },
      ],
    },
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
      {/* <Tree blockNode={true} defaultExpandedKeys={["music", "favorites"]} treeData={myMenuList} /> */}

      <div>
        {userId
          ? myMenuList.map((item) => (
              <div key={item.key} className="mymenu">
                <div className="mymenu-title">
                  <div>{item.title}</div>
                  {item.rightIcon ? item.rightIcon : null}
                </div>
                {item.children.map((i2) => (
                  <div key={i2.key} className="mymenu-item menu-list-item">
                    {i2.title}
                  </div>
                ))}
              </div>
            ))
          : null}
      </div>
    </div>
  )
}
