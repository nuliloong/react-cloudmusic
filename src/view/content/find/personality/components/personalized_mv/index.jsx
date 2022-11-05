import React, { memo, useState, useEffect, useRef } from "react"
import { to } from "@/utils/util"
import { getPersonalizedMv } from "@/api/modules/find"
import { useSize } from "ahooks"
import classNames from "classnames"
import PlayCount from "@c/PlayCount"
import ImgBox from "@c/ImgBox"
import "./index.less"
import Img from "@/components/Img"

function PersonalizedyMV() {
  const [mvList, setMvList] = useState([])
  const box = useRef(null)
  // 获取歌单
  const getMvList = async () => {
    const [err, res] = await to(getPersonalizedMv())
    res && setMvList(res.result || [])
  }

  useEffect(() => {
    getMvList()
  }, [])

  // 监听节点宽度
  const boxSize = useSize(box)
  const [minWidth, setminWidth] = useState(false)
  useEffect(() => {
    setminWidth(boxSize && boxSize.width >= 1000)
  }, [boxSize])

  return (
    <div className={classNames("personalized_mv", { width1000px: minWidth })} ref={box}>
      {mvList.map((item) => (
        <div className="box" key={item.id}>
          <ImgBox loading="lazy" size="1920y1080" className="img-box" src={item.picUrl}>
            <PlayCount playCount={item.playCount} />
            <div className="mask-box">{item.copywriter}</div>
          </ImgBox>
          <span className="box-name">{item.name}</span>
          <span className="box-artist">{item.artistName}</span>
        </div>
      ))}
    </div>
  )
}

export default memo(PersonalizedyMV)
