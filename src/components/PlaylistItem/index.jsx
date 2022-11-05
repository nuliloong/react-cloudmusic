import ImgBox from "@/components/ImgBox"
import PlayCount from "@/components/PlayCount"
import React from "react"
import play from "@/assets/images/play.svg"
import { memo } from "react"
import "./index.less"
import Img from "@/components/Img"

function PlaylistItem(props) {
  const { playCount, name, src, size, loading } = props
  return (
    <div className="playlistitem">
      <ImgBox loading={loading} size={size} className="img-box" src={src}>
        <div className="playicon">
          <img src={play} />
        </div>
        <PlayCount playCount={playCount} />
      </ImgBox>
      <div className="playlistitem-name">{name}</div>
    </div>
  )
}
export default memo(PlaylistItem)
