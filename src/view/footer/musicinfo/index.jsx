import ImgBox from "@/components/ImgBox"
import React,{ memo,useState } from "react"
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
import { Drawer, message } from "antd"
import classNames from "classnames"
import { useSelector } from "react-redux"
import { to } from "@/utils/util"
import { likeSong } from "@/api/modules/play"
import logo from "@/assets/images/logo.svg"

function Musicinfo() {
  const [open, setOpen] = useState(false)
  const [isLike, setLike] = useState(false)
  const { al, ar, id, userId } = useSelector(({ play, user }) => ({
    al: play.currentSongDetail?.al || {},
    ar: play.currentSongDetail?.ar || [],
    id: play.currentSongDetail?.id,
    userId: user.userId,
  }))

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
  // 如果当前没有音乐
  if (!id) {
    return (
      <div className="music-footer open">
        <div className="musicinfo">
          <div className="musicinfo-left">
            <img src={logo} className="img-box img-empty" width="100%" height="100%" />
          </div>
          <div className="musicinfo-name">暂无音乐</div>
        </div>
      </div>
    )
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
            <DownOutlined title="收起音乐详情" onClick={changeDrawer} />
          </div>
          <div className="details-state">
            <LikeNode />
            <FolderAddOutlined title="收藏"/>
            <LoginOutlined rotate="90" title="下载"/>
            <LogoutOutlined rotate="-45" title="分享" />
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
        mask={false}
        maskClosable={false}
        height="100vh"
        open={open}
        key="bottom"
        getContainer={document.querySelector('.ant-layout-has-sider')}
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
