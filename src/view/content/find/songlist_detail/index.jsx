import { getPlaylistDetail } from "@/api/modules/find"
import ImgBox from "@/components/ImgBox"
import MyButton from "@/components/MyButton"
import { formatCount, formatDate, to } from "@/utils/util"
import {
  CaretDownOutlined,
  CaretUpOutlined,
  FolderAddOutlined,
  LogoutOutlined,
  PlayCircleOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Tag, Avatar } from "antd"
import classNames from "classnames"
import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import "./index.less"

export default function SonglistDetail() {
  const [search] = useSearchParams()
  const id = search.get('id')
  const [playlistDetail, setPlayListDetail] = useState({})
  const [isExpand, setExpand] = useState(false)

  const getDetail = async () => {
    const [err, res] = await to(getPlaylistDetail(id))
    if (res && res.playlist) {
      setPlayListDetail(res.playlist)
    }
  }
  useEffect(() => {
    getDetail()
  }, [])

  return (
    <div className="listdetail">
      <div className="listdetail-head">
        <div className="listdetail-head-left">
          <ImgBox
            loading="lazy"
            size="200y200"
            src={playlistDetail.coverImgUrl}
            className="img-box"
          />
        </div>
        <div className="listdetail-head-right">
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
            <MyButton className="backr" icon={<PlayCircleOutlined />}>
              播放全部
            </MyButton>
            <MyButton icon={<FolderAddOutlined />}>
              收藏({formatCount(playlistDetail.subscribedCount || 0)})
            </MyButton>
            <MyButton icon={<LogoutOutlined rotate="-45" />}>
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
      <div className="listdetail-list">
        xxxx
      </div>
    </div>
  )
}
