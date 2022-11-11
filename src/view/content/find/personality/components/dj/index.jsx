import React, { memo, useState, useEffect } from "react"
import { to } from "@/utils/util"
import { getDjHot } from "@/api/modules/find"
import play from "@/assets/play.svg"
import Img from "@c/Img"
import "./index.less"

function Dj() {
  const [djList, setDjList] = useState([])
  // 获取歌单
  const getDjHotList = async () => {
    const [err, res] = await to(getDjHot(6))
    res && setDjList(res.programs || [])
  }
  useEffect(() => {
    getDjHotList()
  }, [])
  return (
    <div className="dj-list">
      {djList.map((item) => (
        <div key={item.id} className="dj-box">
          <div className="dj-box-left">
            <div>
              <Img loading="lazy" size='100y100' src={item.coverUrl} />
            </div>
            <div className="dj-box-left-playicon">
              <img className="playicon-img" src={play} />
            </div>
          </div>
          <div className="dj-box-right">
            <div className="right-name">{item.name}</div>
            <div className="right-tag">
              {item?.channels.map((c, i) => (
                <span className="tag" key={i}>
                  {c}
                </span>
              )) || []}
            </div>
            <div className="right-user">
              <span>{item.dj?.nickname || ""}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default memo(Dj)
