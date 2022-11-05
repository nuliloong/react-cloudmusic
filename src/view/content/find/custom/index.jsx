import { getEverydayRecommendSongList } from "@/api/modules/find"
import React from "react"
import PlaylistItem from "@/components/PlaylistItem"
import "./index.less"
import { useState, useEffect, memo } from "react"
import { to } from "@/utils/util"
import { useSelector } from "react-redux"

function Custom() {
  const nickname = useSelector(({ user }) => user.userInfo?.profile?.nickname || "")
  const [songList, setsongList] = useState([])
  // 获取歌单
  const getSongList = async () => {
    const [err, res] = await to(getEverydayRecommendSongList())
    res && setsongList(res?.recommend?.slice(0, 10) || [])
  }
  useEffect(() => {
    getSongList()
  }, [])
  return (
    <div className="custom">
      <div className="custom-title">
        <div className="custom-title-title">{nickname || "你"}的雷达歌单</div>
        <div>根据你的红心收藏为你推荐更多宝藏歌曲</div>
      </div>
      <div className="custom-my">
        {songList.map((item) => (
          <PlaylistItem
            loading="lazy"
            size="240y240"
            key={item.id}
            src={item.picUrl}
            name={item.name}
            playCount={item.playcount}
          />
        ))}
      </div>
    </div>
  )
}
export default memo(Custom)
