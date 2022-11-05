import { getArtist } from "@/api/modules/find"
import ImgBox from "@/components/ImgBox"
import TagBar from "@/components/TagsBar"
import { throttle, to } from "@/utils/util"
import React from "react"
import { useEffect, useState } from "react"
import "./index.less"

export default function Singer() {
  /* 分类标签 */
  const areaTags = {
    category: "语种",
    list: [
      { area: -1, name: "全部" },
      { area: 7, name: "华语" },
      { area: 96, name: "欧美" },
      { area: 8, name: "日本" },
      { area: 16, name: "韩国" },
      { area: 0, name: "其它" },
    ],
  }
  const typeTags = {
    category: "分类",
    list: [
      { type: -1, name: "全部" },
      { type: 1, name: "男歌手" },
      { type: 2, name: "女歌手" },
      { type: 3, name: "乐队" },
    ],
  }
  const initialTags = {
    category: "筛选",
    list: [
      { initial: -1, name: "热门" },
      { initial: "a", name: "A" },
      { initial: "b", name: "B" },
      { initial: "c", name: "C" },
      { initial: "d", name: "D" },
      { initial: "e", name: "E" },
      { initial: "f", name: "F" },
      { initial: "g", name: "G" },
      { initial: "h", name: "H" },
      { initial: "i", name: "I" },
      { initial: "j", name: "J" },
      { initial: "k", name: "K" },
      { initial: "l", name: "L" },
      { initial: "m", name: "M" },
      { initial: "n", name: "N" },
      { initial: "o", name: "O" },
      { initial: "p", name: "P" },
      { initial: "q", name: "Q" },
      { initial: "r", name: "R" },
      { initial: "s", name: "S" },
      { initial: "t", name: "T" },
      { initial: "u", name: "U" },
      { initial: "v", name: "V" },
      { initial: "w", name: "W" },
      { initial: "x", name: "X" },
      { initial: "y", name: "Y" },
      { initial: "z", name: "Z" },
      { initial: 0, name: "#" },
    ],
  }
  const [area, setArea] = useState(-1)
  const [type, setType] = useState(-1)
  const [initial, setInitial] = useState(-1)
  const [artistList, setArtist] = useState([])
  const [pageIndex, setPage] = useState(1)

  const scrollChange = throttle((e) => {
    const target = e.target
    const offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight
    if (target.scrollTop + target.offsetHeight + offsetHeight + 75 >= target.scrollHeight) {
      console.log("pageIndex>>", pageIndex)
      getArtistList()
    }
  }, 500)
  useEffect(() => {
    let scrollbox = document.getElementsByClassName("find-content")[0]
    scrollbox.addEventListener("scroll", scrollChange)
    return () => scrollbox.removeEventListener("scroll", scrollChange)
  }, [])

  // 获取歌手名单
  const getArtistList = async () => {
    const [err, res] = await to(
      getArtist({ area, type, initial, limit: 60, offset: (pageIndex - 1) * 60 })
    )
    console.log("res>>", res)
    res && setArtist(res?.artists || [])
    setPage(pageIndex + 1)
  }
  // 监听分类
  useEffect(() => {
    setPage(1)
    getArtistList()
  }, [area, type, initial])
  return (
    <div className="leaderboard">
      <TagBar tagList={areaTags} valuekey="area" onChange={setArea} value={area} />
      <TagBar tagList={typeTags} valuekey="type" onChange={setType} value={type} />
      <TagBar tagList={initialTags} valuekey="initial" onChange={setInitial} value={initial} />
      <div className="leaderboard-list">
        {artistList.map((item) => (
          <div key={item.id} className="leaderboard-list-item">
            <ImgBox
              loading="lazy"
              size="220y220"
              src={item.picUrl}
              className="img-box"
              width="100%"
            />
            <div className="item-user">
              <span className="item-user-name">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
