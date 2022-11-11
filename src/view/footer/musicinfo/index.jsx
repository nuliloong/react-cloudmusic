import ImgBox from "@/components/ImgBox"
import React, { memo, useState } from "react"
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
import logo from "@/assets/logo.svg"
import { useDispatch } from "react-redux"
import { setUserLikeList } from "@/redux/modules/user/action"
import Playdetail from "../playdetail"
import { setPlayerExpand } from "@/redux/modules/play/action"

function Musicinfo() {
  const dispatch = useDispatch()
  const { al, ar, id, userId, userLikeList, playerExpand } = useSelector(({ play, user }) => ({
    al: play.currentSongDetail?.al || {},
    ar: play.currentSongDetail?.ar || [],
    id: play.currentSongDetail?.id,
    userId: user.userId,
    userLikeList: user.userLikeList,
    playerExpand: play.playerExpand,
  }))

  const changeDrawer = () => {
    dispatch(setPlayerExpand(!playerExpand))
  }
  const changeLike = async () => {
    if (!userId) {
      message.warn("登录后才能收藏")
      return
    }
    const type = !userLikeList.includes(id)
    const [err, res] = await to(likeSong(id, type))
    if (res.code === 200) {
      dispatch(setUserLikeList(type ? [...userLikeList, id] : userLikeList.filter((i) => i !== id)))
    } else {
      message.error("操作失败")
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
    if (userLikeList.includes(id)) {
      return <HeartFilled title="取消喜欢" className="unlike" onClick={changeLike} />
    }
    return <HeartOutlined title="喜欢" className="like" onClick={changeLike} />
  }

  return (
    <>
      <div className={classNames("music-footer", { open:playerExpand })}>
        <div className="details">
          <div className="normal">
            <DownOutlined title="收起音乐详情" onClick={changeDrawer} />
          </div>
          <div className="details-state">
            <LikeNode />
            <FolderAddOutlined title="收藏" />
            <LoginOutlined rotate="90" title="下载" />
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
      <Playdetail open={playerExpand} />
    </>
  )
}
export default memo(Musicinfo)
