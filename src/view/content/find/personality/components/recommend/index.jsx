import React, { memo, useState, useEffect } from "react"
import { connect } from "react-redux"

import { getRecommendSongList } from "@/api/modules/find"
import { to } from "@/utils/util"
import "./index.less"
import calendar from "@/assets/images/calendar.svg"
import play from "@/assets/images/play.svg"
import PlaylistItem from "@/components/PlaylistItem"

const day = new Date().getDate()

function Recommend(props) {
  const { userId } = props
  const [songList, setsongList] = useState([])
  // 获取歌单
  const getSongList = async () => {
    const [err, res] = await to(getRecommendSongList(9))
    res && setsongList(res.result || [])
  }
  // 每日推荐
  const ererydayClick = () => {
    if (!userId) return
  }
  useEffect(() => {
    getSongList()
  }, [])
  return (
    <div className="list-box">
      <div className="everyday" onClick={ererydayClick}>
        <div className="everyday-img">
          <div className="img">
            <img src={calendar} />
            <span>{day}</span>
          </div>
          <div className="everyday-img-playicon">
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
        />
      ))}
    </div>
  )
}
export default connect(({ user }) => ({
  userId: user.userId,
}))(memo(Recommend))
