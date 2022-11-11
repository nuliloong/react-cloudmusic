import { getPlaylistAll, getPlaylistDetail } from "@/api/modules/find"
import { to } from "@/utils/util"
import classNames from "classnames"
import React, { useState, useEffect } from "react"
import HeadDetail from "./HeadDetail"
import PlayList from "@c/PlayList"
import "./index.less"
import { playAll } from "@h/play"
import Subscribers from "./Subscribers"
import Comments from "./Comments"
import { useParams, useSearchParams } from "react-router-dom"
import { useCallback } from "react"

export default function SonglistDetail() {
  // const [search] = useSearchParams()
  // const id = search.get("id")
  const { id } = useParams()
  const [playlistDetail, setPlayListDetail] = useState({})
  const [type, setType] = useState(0)
  const [commentCount, setCommentCount] = useState(0)
  const [songlist, setSonglist] = useState([])
  const [loading, setLoading] = useState(true)

  // 获取歌单详情
  const getDetail = useCallback(async () => {
    const [err, res] = await to(getPlaylistDetail(id))
    if (res && res.playlist) {
      setPlayListDetail(res.playlist)
      setCommentCount(res.playlist?.commentCount)
    }
  }, [id])

  // 获取歌单所有歌曲
  const getSonglist = useCallback(async () => {
    const [err, res] = await to(getPlaylistAll(id))
    if (res && res.songs) {
      setSonglist(res.songs)
    }
    setLoading(false)
  }, [id])

  useEffect(() => {
    setLoading(true)
    getDetail()
    getSonglist()
  }, [id])
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
      title: "收藏者",
      id: "menu2",
      element: <Subscribers id={id} />,
    },
  ]

  return (
    <div className="listdetail">
      <div className="listdetail-head">
        <HeadDetail
          id={id}
          setPlayListDetail={setPlayListDetail}
          playlistDetail={playlistDetail}
          onPlayAll={() => playAll(songlist)}
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
