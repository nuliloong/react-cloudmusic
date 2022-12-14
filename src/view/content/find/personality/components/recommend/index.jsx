import React, { memo, useState, useEffect } from "react"
import { connect } from "react-redux"

import { getRecommendSongList } from "@/api/modules/find"
import { to } from "@/utils/util"
import "./index.less"
import calendar from "@/assets/calendar.svg"
import play from "@/assets/play.svg"
import PlaylistItem from "@/components/PlaylistItem"
import { message } from "antd"
import { useNavigate } from "react-router-dom"

const day = new Date().getDate()

function Recommend(props) {
  const { userId } = props
  const [songList, setsongList] = useState([])
  const navigate = useNavigate()
  // 获取歌单
  const getSongList = async () => {
    const [err, res] = await to(getRecommendSongList(9))
    res && setsongList(res.result || [])
  }
  // 每日推荐
  const ererydayClick = () => {
    if (!userId) {
      message.warning("该功能需要登录")
      return
    }
    navigate("/daily_recommended")
  }
  useEffect(() => {
    getSongList()
  }, [])
  const playAll = (e) => {
    // e.stopPropagation()
  }
  const songlistClick = (item) => {
    navigate("/songlistdetail/"+item.id)
  }
  return (
    <div className="list-box">
      <div className="everyday" onClick={ererydayClick}>
        <div className="everyday-img">
          <div className="img">
            <img src={calendar} />
            <span>{day}</span>
          </div>
          <div className="everyday-img-playicon" onClick={playAll}>
            <img src={play} />
          </div>
        </div>
        <div className="everyday-name">每日歌曲推荐</div>
      </div>
      {songList.map((item) => (
        <PlaylistItem
          key={item.id}
          loading="lazy"
          size="240y240"
          src={item.picUrl}
          name={item.name}
          playCount={item.playCount}
          clickImg={() => songlistClick(item)}
          clickIcon={() => songlistClick(item)}
          clickName={() => songlistClick(item)}
        />
      ))}
    </div>
  )
}
export default connect(({ user }) => ({
  userId: user.userId,
}))(memo(Recommend))
