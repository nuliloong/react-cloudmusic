import { subAlbumSub } from "@/api/modules/find"
import ImgBox from "@/components/ImgBox"
import MyButton from "@/components/MyButton"
import { formatDate, to } from "@/utils/util"
import {
  CheckCircleOutlined,
  FolderAddOutlined,
  LogoutOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons"
import { message } from "antd"
import React, { memo } from "react"
import { useSelector } from "react-redux"
import "./index.less"

function HeadDetail(props) {
  const { albumDetail, onPlayAll, id, albumDynamic, setAlbumDynamic } = props
  const userId = useSelector(({ user }) => user.userId)
  // 收藏专辑
  const subSongList = async () => {
    if (!userId) message.warn("该功能需要登录权限")
    const t = albumDynamic.subTime ? 2 : 1
    const [err, res] = await to(subAlbumSub(t, id))
    if (res && res.code === 200) {
      message.success(albumDynamic.subTime ? "已取消收藏" : "已成功收藏")
      setAlbumDynamic({ ...albumDynamic, subTime: !albumDynamic.subTime })
      return
    }
    message.error("操作失败，请稍后重试！")
  }
  const sharePlayList = () => {
    message.info("功能待开发")
  }
  return (
    <div className="head">
      <div className="head-left">
        <ImgBox loading="lazy" size="200y200" src={albumDetail.picUrl} className="img-box" />
      </div>
      <div className="head-right">
        <div className="albumname">
          <span>专辑</span>
          {albumDetail.name}
        </div>
        <div className="btn">
          <MyButton className="backr" onClick={onPlayAll} icon={<PlayCircleOutlined />}>
            播放全部
          </MyButton>
          <MyButton
            icon={albumDynamic.subTime ? <CheckCircleOutlined /> : <FolderAddOutlined />}
            onClick={subSongList}
          >
            {albumDynamic.subTime ? "已收藏" : "收藏"}({albumDynamic.subCount || 0})
          </MyButton>
          <MyButton icon={<LogoutOutlined rotate="-45" />} onClick={sharePlayList}>
            分享({albumDynamic.shareCount || 0})
          </MyButton>
        </div>
        <div className="artist">
          歌手：<span className="name">{albumDetail?.artist?.name}</span>
        </div>
        <div className="ctime">时间：{formatDate(albumDetail.publishTime, "yyyy-MM-dd")}</div>
      </div>
    </div>
  )
}
export default memo(HeadDetail)
