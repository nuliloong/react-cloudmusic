import ImgBox from "@/components/ImgBox"
import React from "react"
import "./index.less"
import {
  DownOutlined,
  FolderAddOutlined,
  HeartOutlined,
  LoginOutlined,
  LogoutOutlined,
  UpOutlined,
} from "@ant-design/icons"
import { Drawer } from "antd"
import { useState } from "react"
import classNames from "classnames"

export default function Musicinfo() {
  const [open, setOpen] = useState(false)

  const onClose = () => {
    setOpen(false)
  }
  const changeDrawer = () => {
    setOpen(!open)
  }
  return (
    <>
      <div className={classNames("music-footer", { open })}>
        <div className="details">
          <div className="normal">
            <DownOutlined  onClick={changeDrawer}/>
          </div>
          <div className="love">
            <HeartOutlined title="喜欢" />
            <FolderAddOutlined />
            <LoginOutlined rotate="90" />
            <LogoutOutlined rotate="-45" />
          </div>
        </div>
        <div className="musicinfo">
          <div className="musicinfo-left">
            <ImgBox
              loading="lazy"
              size="80y80"
              src="https://p2.music.126.net/EsddegOBGounGgPZSluY7w==/109951168029935922.jpg?param=80y80"
              className="img-box"
              width="100%"
              height="100%"
            >
              <div className="expand" title="展开音乐详情" onClick={changeDrawer}>
                <UpOutlined />
              </div>
            </ImgBox>
          </div>
          <div className="musicinfo-name">
            <div className="musicname" title="I WANNA BE YOUR SLAVE">
              I WANNA BE YOUR SLAVE
            </div>
            <div className="artist">
              <span className="name">Måneskin</span>
            </div>
          </div>
          <div className="musicinfo-like">
            <HeartOutlined title="喜欢" />
          </div>
        </div>
      </div>
      <Drawer
        className="xxxxxxxxxx"
        placement="bottom"
        closable={false}
        maskClosable={false}
        height="100vh"
        open={open}
        key="bottom"
      >
        <button onClick={onClose}>xxxxx</button>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}
