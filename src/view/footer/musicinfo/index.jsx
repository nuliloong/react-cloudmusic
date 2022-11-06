import ImgBox from "@/components/ImgBox"
import React from "react"
import "./index.less"
import {
  DownOutlined,
  FolderAddOutlined,
  HeartFilled,
  HeartOutlined,
  LoginOutlined,
  LogoutOutlined,
  UpOutlined,
} from "@ant-design/icons"
import { Drawer } from "antd"
import { useState } from "react"
import classNames from "classnames"
import { useSelector } from "react-redux"
import { memo } from "react"
import { to } from "@/utils/util"
import { likeSong } from "@/api/modules/play"
import { message } from "antd"

function Musicinfo() {
  const [open, setOpen] = useState(false)
  const [isLike, setLike] = useState(false)
  const { al, ar, id, userId } = useSelector(({ play, user }) => ({
    al: play.currentSongDetail?.al || {},
    ar: play.currentSongDetail?.ar || [],
    id: play.currentSongDetail?.id,
    userId: user.userId,
  }))
  // const { al, ar, id } = currentSongDetail

  const onClose = () => {
    setOpen(false)
  }
  const changeDrawer = () => {
    setOpen(!open)
  }
  const changeLike = async () => {
    if (!userId) {
      message.warn("登录后才能收藏")
      return
    }
    const [err, res] = await to(likeSong(id, !isLike))
    if (res) {
      setLike(!isLike)
    }
  }
  const LikeNode = () => {
    if (isLike) {
      return <HeartFilled title="取消喜欢" className="unlike" onClick={changeLike} />
    }
    return <HeartOutlined title="喜欢" className="like" onClick={changeLike} />
  }

  return (
    <>
      <div className={classNames("music-footer", { open })}>
        <div className="details">
          <div className="normal">
            <DownOutlined onClick={changeDrawer} />
          </div>
          <div className="details-state">
            <LikeNode />
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
              src={al?.picUrl || ""}
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
            <div className="musicname" title={al?.name || ""}>
              {al?.name || ""}
            </div>
            <div className="artist">
              <span className="name">{ar[0]?.name || ""}</span>
            </div>
          </div>
          <div className="musicinfo-state">
            <LikeNode />
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
export default memo(Musicinfo)
