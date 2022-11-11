import React from "react"
import "./index.less"

export default function AlbumIntroduce({ albumDetail }) {
  return (
    <div className="album-description">
      <div className="descr">{albumDetail.description}</div>
    </div>
  )
}
