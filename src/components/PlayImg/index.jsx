import React from "react"
import play from "@/assets/play.svg"
import { memo } from "react"
import "./index.less"
import Img from "../Img"

// ;<PlayImg
//   size="80y80"
//   src={record.album.picUrl}
//   width="60px"
//   height="60px"
//   onClick={() => playMusic(text, record)}
// />

function PlayImg(props) {
  let { width, height, src, onClick, ...other } = props
  const style = { width: width || "", height: height || width || "" }
  return (
    <div className="play-img" onClick={onClick} style={style}>
      <div>
        <Img loading="lazy" {...other} src={src} style={style} />
      </div>
      <div className="play-img-playicon">
        <img className="playicon" src={play} />
      </div>
    </div>
  )
}
export default memo(PlayImg)
