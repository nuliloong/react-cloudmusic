import React from "react"
import play from "@/assets/images/play.svg"
import { memo } from "react"
import "./index.less"
import Img from "../Img"

function PlayImg(props) {
  let { width, height, src, ...other } = props
  const style = { width: width || "", height: height || width || "" }
  return (
    <div className="play-img" style={style}>
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
