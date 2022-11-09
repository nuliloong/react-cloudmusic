import { getRecommendSongs } from "@/api/modules/find"
import { clearPlayList } from "@/redux/modules/play/action"
import { CalendarOutlined, FolderAddOutlined, PlayCircleOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { to } from "@/utils/util"
import "./index.less"
import MyButton from "@/components/MyButton"
import PlayList from "@/components/PlayList"
import { playMusic, getSongInfo, playAll } from "@h/play"

const day = new Date().getDate()
export default function DailyRecommended() {
  const [isLoading, setLoading] = useState(false)
  const [songList, setSongList] = useState([])
  const dispatch = useDispatch()
  // 获取歌曲列表
  const getSongsList = async () => {
    setLoading(true)
    const [err, res] = await to(getRecommendSongs())
    if (res) {
      setSongList(res?.data?.dailySongs || [])
    }
    setLoading(false)
  }
  useEffect(() => {
    getSongsList()
  }, [])
  // 播放全部
  // let flag = 0
  // const playAll = async () => {
  //   const result = await playMusic(songList[flag])
  //   if (!result) {
  //     flag++
  //     playAll()
  //     return
  //   }
  //   const AllList = songList.map((item) => getSongInfo(item))
  //   dispatch(clearPlayList(AllList))
  // }
  return (
    <div className="daily">
      <div className="daily-titlebox">
        <div className="daily-imgbox">
          <CalendarOutlined />
          <span className="day">{day}</span>
        </div>
        <div className="daily-title">
          <h2>每日歌曲推荐</h2>
          <p>根据你的音乐口味生成，每天6:00更新</p>
        </div>
      </div>
      <div className="daily-btn">
        <MyButton className="backr" onClick={()=>playAll(songList)} icon={<PlayCircleOutlined />}>
          播放全部
        </MyButton>
        <MyButton className="btn star" icon={<FolderAddOutlined />}>
          收藏全部
        </MyButton>
      </div>
      <div className="daily-list">
        <PlayList songs={songList} loading={isLoading} />
      </div>
    </div>
  )
}
