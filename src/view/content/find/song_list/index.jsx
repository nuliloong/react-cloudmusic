import { getCategory, getHighquality, getTagHot, getTopPlaylist } from "@/api/modules/find"
import ImgBox from "@/components/ImgBox"
import { to } from "@/utils/util"
import { RightOutlined, SketchOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import classNames from "classnames"
import React from "react"
import { useState, useEffect } from "react"
import PlaylistItem from "../../../../components/PlaylistItem"
import "./index.less"

export default function SongList() {
  const [boutique, setBoutique] = useState({})
  const [taghot, setTaghot] = useState([])
  const [songList, setSongList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [categoryList, setCategoryList] = useState({})
  const [cat, setCat] = useState("全部")
  // const [pageIndex, setPageIndex] = useState(1)
  const [page, setPage] = useState({
    pageIndex: 1,
    total: 0,
  })

  // 获取顶部精品歌单
  const getBoutique = async () => {
    const [err, res] = await to(getHighquality({ cat, limit: 1 }))
    res && setBoutique(res?.playlists?.[0] || {})
  }
  // 全部歌单分类
  const getCategoryALL = async () => {
    const [err, res] = await to(getCategory())
    res && setCategoryList(res || {})
  }
  // 获取热门标题
  const getTagHotList = async () => {
    const [err, res] = await to(getTagHot())
    res && setTaghot(res.tags || [])
  }
  const setType = (name) => {
    setPage({ pageIndex: 1, total: 0 })
    setCat(name)
  }
  // 获取歌单
  const getSongList = async (page) => {
    const { pageIndex } = page
    setLoading(true)
    const [err, res] = await to(getTopPlaylist({ cat, limit: 100, offset: (pageIndex - 1) * 100 }))
    if (res) {
      setPage({ pageIndex: pageIndex + 1, total: res.total })
      setSongList(res.playlists || [])
    }
    setLoading(false)
  }

  // 监听分类
  useEffect(() => {
    setPage({ pageIndex: 1, total: 0 })
    getBoutique()
    getSongList(page)
  }, [cat])
  // 初始化
  useEffect(() => {
    getTagHotList()
    getCategoryALL()
  }, [])

  return (
    <div className="songlist">
      {boutique.name ? (
        <div
          className="songlist-banner"
          style={{ backgroundImage: `url(${boutique.coverImgUrl}?param=30y20)` }}
        >
          <div className="songlist-banner-left">
            <ImgBox
              loading="lazy"
              size="180y180"
              src={boutique.coverImgUrl || ""}
              className="img-box"
            />
          </div>
          <div className="songlist-banner-right">
            <div className="button">
              <button>
                <SketchOutlined />
                精品歌单
              </button>
            </div>
            <div className="name">{boutique.name}</div>
            <div className="desc">{boutique.description}</div>
          </div>
        </div>
      ) : null}
      <div className="songlist-tagbox">
        <button className="tagbtn">
          精品歌单
          <RightOutlined />
        </button>
        <div className="taglist">
          {taghot.map((item) => (
            <button
              key={item.id}
              className={classNames({ active: cat === item.name })}
              onClick={() => setType(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <Spin className="listloading" spinning={isLoading}>
        <div className="songlist-list">
          {songList.map((item) => (
            <PlaylistItem
              key={item.id}
              loading="lazy"
              size="240y240"
              src={item.coverImgUrl}
              name={item.name}
              playCount={item.playCount}
            />
          ))}
        </div>
      </Spin>
    </div>
  )
}
