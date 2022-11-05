import React, { memo, useState, useEffect } from "react"
import { to } from "@/utils/util"
import { getTopSong } from "@/api/modules/find"
import play from "@/assets/images/play.svg"
import Img from "@c/Img"
import "./index.less"

function NewMusic() {
  const [songList, setSongList] = useState([])
  // 获取歌单
  const getSongList = async () => {
    const [err, res] = await to(getTopSong(0))
    res && setSongList(res.data.slice(0, 12) || [])
  }
  useEffect(() => {
    getSongList()
  }, [])
  return (
    <div className="new-music">
      {songList.map((item) => (
        <div key={item.id} className="music-box">
          <div className="music-box-left">
            <div>
              <Img loading="lazy" size="100y100" src={item.album.picUrl} />
            </div>
            <div className="music-box-left-playicon">
              <img className="playicon-img" src={play} />
            </div>
          </div>
          <div className="music-box-right">
            <div className="right-name">
              {item.name}
              {item?.transNames?.map((t, ti) => (
                <span className="right-name-tip" key={`tip-${ti}`}>
                  ({t})
                </span>
              )) || null}
            </div>
            <div className="right-user">
              {item?.artists?.map((u, i) => (
                <span key={u.id}>
                  <span className="name">
                    {u.name}
                  </span>
                  {item.artists.length === i + 1 ? "" : " / "}
                </span>
              )) || null}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default memo(NewMusic)
