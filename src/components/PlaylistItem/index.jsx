import ImgBox from "@/components/ImgBox"
import PlayCount from "@/components/PlayCount"
import React from "react"
import play from "@/assets/play.svg"
import { memo } from "react"
import "./index.less"
import Img from "@/components/Img"

// ;<PlaylistItem
//   key={item.id}
//   loading="lazy"
//   size="240y240"
//   src={item.picUrl}
//   name={item.name}
//   playCount={item.playCount}
//   clickImg={() => songlistClick(item)}
// />
function PlaylistItem(props) {
  const { playCount, name, src, size, loading, clickImg, clickIcon, clickName } = props
  return (
    <div className="playlistitem">
      <ImgBox loading={loading} size={size} className="img-box" src={src} onClick={clickImg}>
        <div className="playicon" onClick={clickIcon}>
          <img src={play} />
        </div>
        <PlayCount playCount={playCount} />
      </ImgBox>
      <div className="playlistitem-name" onClick={clickName}>
        {name}
      </div>
    </div>
  )
}
export default memo(PlaylistItem)
