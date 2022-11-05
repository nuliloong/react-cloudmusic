import React, { useState, useEffect, memo } from "react"
import { throttle, to } from "@/utils/util"
import { getTopAlbum } from "@/api/modules/find"
import "./index.less"
import classNames from "classnames"
import ImgBox from "@/components/ImgBox"
import play from "@/assets/images/play.svg"
import { Spin } from "antd"

function NewAlbum() {
  const [type, setType] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const [query, setQuery] = useState({
    offset: 0,
    limit: 30,
    area: "ALL",
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  })
  const [albumList, setAlbumList] = useState([])
  const typeList = [
    { type: "ALL", name: "全部" },
    { type: "ZH", name: "华语" },
    { type: "AE", name: "欧美" },
    { type: "KR", name: "韩国" },
    { type: "JP", name: "日本" },
  ]
  const getNewAlbum = async () => {
    setLoading(true)
    const [err, res] = await to(getTopAlbum(query))
    // console.log('res>>', res)
    res && setAlbumList(res.weekData || res.monthData || [])
    setLoading(false)
  }

  useEffect(() => {
    getNewAlbum()
  }, [query])

  // const scrollChange = throttle((e) => {
  //   console.log("e>>", e.target.scrollTop)
  // }, 500)
  // useEffect(() => {
  //   let scrollbox = document.getElementsByClassName("find-content")[0]
  //   scrollbox.addEventListener("scroll", scrollChange)
  //   return () => scrollbox.removeEventListener("scroll", scrollChange)
  // }, [])

  return (
    <>
      <div className="newalbum-typebox">
        <div className="newalbum-type">
          {typeList.map((item) => (
            <div
              className={classNames("item", { active: query.area === item.type })}
              key={item.type}
              onClick={() => setQuery({ ...query, area: item.type })}
            >
              {item.name}
            </div>
          ))}
        </div>
        {/* <div className="newalbum-play">
          <button className={classNames({ active: type })} onClick={() => setType(true)}>
            推荐
          </button>
          <button className={classNames({ active: !type })} onClick={() => setType(false)}>
            全部
          </button>
        </div> */}
      </div>
      <Spin spinning={isLoading}>
        <div className="newalbum-list">
          {albumList.map((item) => (
            <div className="item" key={item.id}>
              <ImgBox
                loading="lazy"
                size="220y220"
                src={item.picUrl}
                className="img-box"
                width="100%"
                height="100%"
              >
                <div className="playicon">
                  <img src={play} />
                </div>
              </ImgBox>
              <div className="item-name">
                <span>{item.name}</span>
                {item?.transNames?.length ? (
                  <span className="transnames">{item.name}</span>
                ) : (
                  ""
                )}
              </div>
              <div className="item-user">
                {item?.artists?.map((u, i) => (
                  <span key={u.id}>
                    <span className="name" key={u.id}>
                      {u.name}
                    </span>
                    {item.artists.length === i + 1 ? "" : " / "}
                  </span>
                )) || null}
              </div>
            </div>
          ))}
        </div>
      </Spin>
    </>
  )
}
export default memo(NewAlbum)
