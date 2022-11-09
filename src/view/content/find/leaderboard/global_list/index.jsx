import React from "react"
import { memo } from "react"
import "./index.less"
import PlaylistItem from "@/components/PlaylistItem"
import { useNavigate } from "react-router-dom"

function GlobalList({ list }) {
  const navigate = useNavigate()
  const songlistClick = (item) => {
    navigate("/find/songlistdetail?id="+item.id)
  }
  return (
    <div className="globallist">
      <h2 className="globallist-title">官方榜</h2>
      <div className="globallist-list">
        {list.map((item) => (
          <PlaylistItem
            key={item.id}
            loading="lazy"
            size="240y240"
            src={item.coverImgUrl}
            name={item.name}
            playCount={item.playCount}
            clickImg={() => songlistClick(item)}
            clickIcon={() => songlistClick(item)}
            clickName={() => songlistClick(item)}
          />
        ))}
      </div>
    </div>
  )
}
export default memo(GlobalList)
