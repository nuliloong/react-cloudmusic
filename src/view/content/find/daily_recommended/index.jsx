import { getRecommendSongs } from "@/api/modules/find"
import { checkMusic, getSongUrl } from "@/api/modules/play"
import {
  addPlayinglist,
  clearPlayList,
  saveSongDetail,
  setPlayState,
  setSongUrl,
} from "@/redux/modules/play/action"
import {
  CalendarOutlined,
  CaretRightOutlined,
  FolderAddOutlined,
  PauseOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons"
import { Table } from "antd"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { formatDuration, to } from "@/utils/util"
import "./index.less"
import MyButton from "@/components/MyButton"

const day = new Date().getDate()
export default function DailyRecommended() {
  const [isLoading, setLoading] = useState(false)
  const [songList, setSongList] = useState([])
  const dispatch = useDispatch()
  const { currentPlayId, isPlaying } = useSelector(({ play }) => ({
    currentPlayId: play.currentSongDetail?.id,
    isPlaying: play.isPlaying,
  }))
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
  let flag = 0
  const playAll = async () => {
    const result = await playMusic(songList[flag])
    if (!result) {
      flag++
      playAll()
      return
    }
    const AllList = songList.map((item) => getSongInfo(item))
    dispatch(clearPlayList(AllList))
  }

  // 当前播放项添加图标
  const PlayNode = ({ id, index }) => {
    if (id === currentPlayId) {
      if (isPlaying) {
        return <CaretRightOutlined className="red-col" />
      }
      return <PauseOutlined className="red-col" />
    }
    return `${index < 9 ? "0" : ""}${index + 1}`
  }
  // 提取需要的歌曲信息
  const getSongInfo = (song) => {
    let nowSongInfo = { al: {}, ar: [{}] }
    nowSongInfo.id = song.id //歌曲id
    nowSongInfo.name = song.name //歌曲名
    nowSongInfo.dt = song.dt //歌曲时长
    nowSongInfo.al.picUrl = song.al?.picUrl || "" //专辑封面
    nowSongInfo.al.name = song.al.name //专辑名
    nowSongInfo.al.id = song.al.id //专辑id
    nowSongInfo.ar[0].name = song.ar[0].name //歌手名
    nowSongInfo.ar[0].id = song.ar[0].id //歌手id
    if (song.mv != 0) {
      nowSongInfo.mv = song.mv //mv的id
    }
    return nowSongInfo
  }
  // 播放音乐
  const playMusic = async (music) => {
    const [err, res] = await to(checkMusic(music.id))
    if (res.success) {
      const [err1, res1] = await to(getSongUrl(music.id))
      if (res1) {
        dispatch(setSongUrl(res1.data[0].url))
        dispatch(setPlayState(true)) // 更新播放状态
        dispatch(saveSongDetail(getSongInfo(music))) // 保存当前歌曲详情
        dispatch(addPlayinglist(getSongInfo(music))) // 添加到播放列表
        return true
      }
      return
    }
    message.warning(res?.message || "暂时无法播放，换首试试")
    return
  }
  // 表格配置项
  const columns = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: "60px",
      align: "right",
      render: (text, record, index) => <PlayNode id={record.id} index={index} />,
      onCell: () => ({ className: "index-col" }),
    },
    {
      title: "音乐标题",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      onCell: (record) => ({ className: record.id == currentPlayId ? "red-col" : null }),
    },
    {
      title: "歌手",
      dataIndex: ["ar", "0", "name"],
      key: "artists",
      ellipsis: true,
    },
    {
      title: "专辑",
      dataIndex: ["al", "name"],
      key: "album",
      ellipsis: true,
    },
    {
      title: "时长",
      dataIndex: "dt",
      key: "dt",
      width: "70px",
      render: (text) => formatDuration(text),
      onCell: () => ({ className: "duration-col" }),
    },
  ]
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
        <MyButton className="backr" onClick={playAll} icon={<PlayCircleOutlined />}>
        播放全部
        </MyButton>
        <MyButton className="btn star" icon={<FolderAddOutlined />}>
          收藏全部
        </MyButton>
      </div>
      <div className="daily-list">
        <Table
          loading={isLoading}
          pagination={false}
          size="small"
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={songList}
          onRow={(record) => {
            return {
              onDoubleClick: () => playMusic(record),
            }
          }}
        />
      </div>
    </div>
  )
}
