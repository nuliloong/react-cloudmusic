import React from "react"
import { Input, Avatar, Popover } from "antd"
import { useNavigate } from "react-router-dom"
import {
  LeftOutlined,
  RightOutlined,
  // AudioOutlined,
  UserOutlined,
  SkinOutlined,
  // SettingOutlined,
  // MailOutlined,
  // LineOutlined,
  // CloseOutlined,
  PicCenterOutlined,
  CaretDownOutlined,
  ExpandOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons"
import UserStateBox from "./userState"

import logo from "@/assets/logo.svg"
import vip from "@/assets/vip.svg"
import search from "@/assets/search.svg"
import { useSelector, useDispatch } from "react-redux"
import { changeLoginShow } from "@/redux/modules/user/action"
import { useState } from "react"
import "./index.less"
import { exitFullscreen, requestFullScreen } from "@/utils/util"
import Theme from "./Theme"

export default function Header() {
  const navigate = useNavigate()
  const routerBack = () => navigate(-1)
  const routerForward = () => navigate(1)
  const [isFull, setisFull] = useState(false)
  const [isMini, setisMini] = useState(false)

  const { userId, avatarUrl, nickname } = useSelector(({ user }) => ({
    userId: user.userId,
    avatarUrl: user.userInfo?.profile?.avatarUrl || "src",
    nickname: user.userInfo?.profile?.nickname || "未登录",
  }))
  const dispatch = useDispatch()

  // 点击用户头像
  const avatarClick = () => {
    console.log("avatarClick>>")
    if (!userId) {
      dispatch(changeLoginShow(true))
    }
  }
  // 点击用户名称
  const userNameClick = (e) => {
    if (!userId) {
      dispatch(changeLoginShow(true))
      return
    }
  }
  // 用户名称
  const UserNamePopover = () => {
    let Node = (props) => (
      <div onClick={props.onClick} className="userinfo">
        <span>{nickname}</span>
        <CaretDownOutlined />
      </div>
    )
    if (!userId) return <Node onClick={userNameClick} />
    return (
      <Popover content={<UserStateBox />} placement="bottom" trigger="click">
        <Node onClick={userNameClick} />
      </Popover>
    )
  }
  // 全屏
  const full = () => {
    if (!isFull) {
      setisFull(true)
      requestFullScreen()
      return
    }
    setisFull(false)
    exitFullscreen()
  }
  const mini = () => {
    if (!isMini) {
      document.querySelector("#root").style.height = "680px"
      document.querySelector("#root").style.width = "1030px"
    } else {
      document.querySelector("#root").style.height = "100vh"
      document.querySelector("#root").style.width = "100%"
    }
    setisMini(!isMini)
  }

  return (
    <>
      <div className="header">
        <div className="logo">
          <img className="logo-img" src={logo} alt="logo" />
          <span className="logo-title">镜子云音乐</span>
        </div>
        <div className="control">
          <div className="control-icon" onClick={routerBack}>
            <LeftOutlined />
          </div>
          <div className="control-icon" onClick={routerForward}>
            <RightOutlined />
          </div>
        </div>
        <div className="search">
          <Input
            placeholder="default size"
            prefix={
              <div className="search-img">
                <img src={search} alt="search" />
              </div>
            }
          />
          {/* <div className="search-icon" title="听歌识曲">
            <AudioOutlined />
          </div> */}
        </div>
        <div style={{ flex: 1 }}></div>
        <div className="setting">
          <div className="setting-user">
            <div className="avatar-img" onClick={avatarClick}>
              <Avatar src={avatarUrl} icon={<UserOutlined />} />
            </div>
            <UserNamePopover />
            <div className="user-level">
              <img src={vip} alt="vip" />
            </div>
          </div>
          <div className="setting-btn">
            <Popover content={<Theme />} placement="bottom" trigger="click">
              <div className="setting-btn-item" title="主题">
                <SkinOutlined />
              </div>
            </Popover>
            {/* <div className="setting-btn-item" title="设置">
              <SettingOutlined />
            </div> */}
            {/* <div className="setting-btn-item" title="消息">
              <MailOutlined />
            </div> */}
          </div>
          <div className="setting-sys">
            {/* <div className="setting-sys-item" title="mini模式">
              <PicCenterOutlined />
            </div> */}
            {/* <div className="setting-sys-item" title={!isMini ? "最小化" : "网页全屏"} onClick={mini}>
              <PicCenterOutlined />
            </div> */}
            <div className="setting-sys-item" title={isFull ? "退出全屏" : "全屏"} onClick={full}>
              {isFull ? <FullscreenExitOutlined /> : <ExpandOutlined />}
            </div>
            {/* <div className="setting-sys-item" title="关闭">
              <CloseOutlined />
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}
