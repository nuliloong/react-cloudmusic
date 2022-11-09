import { subPlayList } from "@/api/modules/find"
import ImgBox from "@/components/ImgBox"
import MyButton from "@/components/MyButton"
import { formatCount, formatDate, to } from "@/utils/util"
import {
  CaretDownOutlined,
  CaretUpOutlined,
  CheckCircleOutlined,
  FolderAddOutlined,
  LogoutOutlined,
  PlayCircleOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { message } from "antd"
import { Tag, Avatar } from "antd"
import classNames from "classnames"
import React, { useState } from "react"
import { memo } from "react"
import { useSelector } from "react-redux"
import "./index.less"

function HeadDetail(props) {
  const { playlistDetail, onPlayAll, id, setPlayListDetail } = props
  const [isExpand, setExpand] = useState(false)
  const userId = useSelector(({ user }) => user.userId)
  // 收藏歌单
  const subSongList = async () => {
    if (!userId) message.warn("该功能需要登录权限")
    const t = playlistDetail.subscribed ? 2 : 1
    const [err, res] = await to(subPlayList(t, id))
    if (res && res.code === 200) {
      message.success(playlistDetail.subscribed ? "已取消收藏" : "已成功收藏")
      setPlayListDetail({ ...playlistDetail, subscribed: !playlistDetail.subscribed })
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
        <ImgBox
          loading="lazy"
          size="200y200"
          src={playlistDetail.coverImgUrl}
          className="img-box"
        />
      </div>
      <div className="head-right">
        <div className="name">
          <span>歌单</span>
          {playlistDetail.name}
        </div>
        <div className="user">
          <Avatar size={30} src={playlistDetail?.creator?.avatarUrl} icon={<UserOutlined />} />
          <span className="nickname">{playlistDetail?.creator?.nickname}</span>
          <span className="ctime">{formatDate(playlistDetail.createTime, "yyyy-MM-dd")}创建</span>
        </div>
        <div className="btn">
          <MyButton className="backr" onClick={onPlayAll} icon={<PlayCircleOutlined />}>
            播放全部
          </MyButton>
          <MyButton
            icon={playlistDetail.subscribed ? <CheckCircleOutlined /> : <FolderAddOutlined />}
            onClick={subSongList}
          >
            {playlistDetail.subscribed ? "已收藏" : "收藏"}(
            {formatCount(playlistDetail.subscribedCount || 0)})
          </MyButton>
          <MyButton icon={<LogoutOutlined rotate="-45" />} onClick={sharePlayList}>
            分享({formatCount(playlistDetail.shareCount || 0)})
          </MyButton>
        </div>
        <div>
          标签：
          {playlistDetail?.tags?.map((item, index) => (
            <Tag key={index} color="volcano">
              {item}
            </Tag>
          ))}
        </div>
        <div>
          <span>歌曲：{playlistDetail?.trackIds?.length}首</span>
          <span style={{ paddingLeft: "20px" }}>
            播放：{formatCount(playlistDetail?.playCount)}
          </span>
        </div>
        <div className="descbox">
          {playlistDetail?.description ? (
            <>
              <div className={classNames("desc", { expand: isExpand })}>
                简介：{playlistDetail.description}
              </div>
              <div onClick={() => setExpand(!isExpand)}>
                {isExpand ? <CaretUpOutlined /> : <CaretDownOutlined />}
              </div>
            </>
          ) : (
            <div>简介：暂无简介</div>
          )}
        </div>
      </div>
    </div>
  )
}
export default memo(HeadDetail)
