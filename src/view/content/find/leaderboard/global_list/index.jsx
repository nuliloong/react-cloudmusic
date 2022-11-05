import React from "react"
import { memo } from "react"
import "./index.less"
import PlaylistItem from "@/components/PlaylistItem"

function GlobalList(props) {
  const { list } = props
  console.log("list>>", list)
  return (
    <div className="globallist">
      <h2 className="globallist-title">官方榜</h2>
      <div className="globallist-list">
        {list.map((item) => (
          <PlaylistItem
          className='xxxxx'
            key={item.id}
            loading="lazy"
            size="240y240"
            src={item.coverImgUrl}
            name={item.name}
            playCount={item.playCount}
          />
        ))}
      </div>
    </div>
  )
}
export default memo(GlobalList)
