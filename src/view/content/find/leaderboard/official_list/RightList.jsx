import { getListDetail } from "@/api/modules/find"
import { to } from "@/utils/util"
import { RightOutlined } from "@ant-design/icons"
import { Skeleton } from "antd"
import React, { memo, Fragment, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { playMusic } from "@h/play"
import "./index.less"

function RightList(props) {
  const { id } = props
  const [loading, setloading] = useState(true)
  const [songList, setSongList] = useState([])
  const navigate = useNavigate()
  const getList = async () => {
    const [err, res] = await to(getListDetail(id))
    if (res) {
      setSongList(res?.playlist?.tracks?.slice(0, 5) || [])
      setloading(false)
    }
  }
  useEffect(() => {
    getList()
  }, [])
  // const formatArtists = (artists) => {
  //   if (!artists.length) return []
  // }
  const songlistClick = () => {
    navigate("/songlistdetail/"+id)
  }
  return (
    <>
      <Skeleton active paragraph={{ rows: 5 }} loading={loading}>
        {songList.map((item, index) => (
          <div key={item.id} className="item-right-item" onDoubleClick={() => playMusic(item)}>
            <div className={index < 3 ? "index top" : "index"}>{index + 1}</div>
            <div className="name">{item.name}</div>
            <div className="artist">
              {item?.ar?.map((a, i) => (
                <Fragment key={a.id}>
                  <span className="artist-name">{a.name}</span>
                  {i !== item.ar.length - 1 ? " / " : null}
                </Fragment>
              )) || null}
            </div>
          </div>
        ))}
        <div className="item-right-more">
          <span className="text" onClick={songlistClick}>
            查看全部
            <RightOutlined />
          </span>
        </div>
      </Skeleton>
    </>
  )
}
export default memo(RightList)
