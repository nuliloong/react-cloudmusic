import {
  getAlbumDetail,
  getAlbumDetailDy,
  getPlaylistAll,
  getPlaylistDetail,
} from "@/api/modules/find"
import { to } from "@/utils/util"
import classNames from "classnames"
import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import HeadDetail from "./HeadDetail"
import PlayList from "../../../../components/PlayList"
import "./index.less"
import { playAll } from "@h/play"
import AlbumIntroduce from "./AlbumIntroduce"
import Comments from "./Comments"

export default function SonglistDetail() {
  const [search] = useSearchParams()
  const id = search.get("id")
  const [albumDetail, setAlbumDetail] = useState({})
  const [albumDynamic, setAlbumDynamic] = useState({})
  const [type, setType] = useState(0)
  const [commentCount, setCommentCount] = useState(0)
  const [songlist, setSonglist] = useState([])
  const [loading, setLoading] = useState(true)

  // 获取歌单详情
  const getDetail = async () => {
    const [err, res] = await to(getAlbumDetail(id))
    if (res && res.album) {
      setAlbumDetail(res.album)
      setSonglist(res.songs)
      setLoading(false)
    }
  }
  // 专辑动态信息
  const getAlbumDy = async () => {
    const [err, res] = await to(getAlbumDetailDy(id))
    if (res) {
      setAlbumDynamic(res)
      setCommentCount(res.commentCount)
    }
  }
  useEffect(() => {
    getDetail()
    getAlbumDy()
  }, [])
  const menulist = [
    {
      title: "歌曲列表",
      id: "menu0",
      element: <PlayList songs={songlist} loading={loading} />,
    },
    {
      title: `评论(${commentCount})`,
      id: "menu1",
      element: <Comments id={id} setCommentCount={setCommentCount} />,
    },
    {
      title: "专辑详情",
      id: "menu2",
      element: <AlbumIntroduce albumDetail={albumDetail} />,
    },
  ]

  return (
    <div className="listdetail">
      <div className="listdetail-head">
        <HeadDetail
          id={id}
          albumDetail={albumDetail}
          onPlayAll={() => playAll(songlist)}
          albumDynamic={albumDynamic}
          setAlbumDynamic={setAlbumDynamic}
        />
      </div>
      <ul className="listdetail-menu">
        {menulist.map((item, index) => (
          <div
            key={item.id}
            className={classNames("listdetail-menu-item", { active: index === type })}
            onClick={() => setType(index)}
          >
            {item.title}
          </div>
        ))}
      </ul>
      <div className="listdetail-list">
        <div className="menu-element">{menulist[type].element}</div>
      </div>
    </div>
  )
}
