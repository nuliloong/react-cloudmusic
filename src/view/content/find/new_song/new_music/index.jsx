import React, { useState, useEffect, memo } from "react"
import { FolderAddOutlined, PlayCircleOutlined } from "@ant-design/icons"
import { formatDuration, to } from "@/utils/util"
import { getTopSong } from "@/api/modules/find"
import { checkMusic, getSongUrl } from "@/api/modules/play"
import { Table } from "antd"
import PlayImg from "@/components/PlayImg"
import "./index.less"
import classNames from "classnames"
import { message } from "antd"
import { useDispatch } from "react-redux"
import {
  addPlayinglist,
  saveSongDetail,
  setPlayState,
  setSongUrl,
} from "@/redux/modules/play/action"
import { useRef } from "react"

function NewMusic() {
  const [isLoading, setLoading] = useState(false)
  const [type, setType] = useState(0)
  const [songList, setSongList] = useState([])
  const dispatch = useDispatch()

  // 提取需要的歌曲信息
  const getSongInfo = (song) => {
    let nowSongInfo = { al: {}, ar: [{}] }
    nowSongInfo.id = song.id //歌曲id
    nowSongInfo.name = song.name //歌曲名
    nowSongInfo.dt = song.duration //歌曲时长
    nowSongInfo.al.picUrl = song.album.picUrl //专辑封面
    nowSongInfo.al.name = song.album.name //专辑名
    nowSongInfo.al.id = song.album.id //专辑id
    nowSongInfo.ar[0].name = song.artists[0].name //歌手名
    nowSongInfo.ar[0].id = song.artists[0].id //歌手id
    if (song.mvid != 0) {
      nowSongInfo.mv = song.mvid //mv的id
    }
    return nowSongInfo
  }
  const playMusic = async (music) => {
    const [err, res] = await to(checkMusic(music.id))
    if (res.success) {
      const [err1, res1] = await to(getSongUrl(music.id))
      if (res1) {
        dispatch(setSongUrl(res1.data[0].url))
        dispatch(setPlayState(true)) // 更新播放状态
        dispatch(saveSongDetail(getSongInfo(music))) // 保存当前歌曲详情
        dispatch(addPlayinglist(getSongInfo(music))) // 添加到播放列表
      }
      return
    }
    message.warning(res?.message || "暂时无法播放，换首试试")
  }
  let timer = null
  const dbClick = (record) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      playMusic(record)
      clearTimeout(timer)
    }, 500)
  }
  // useEffect(() => {
  //   return () => clearTimeout(timer)
  // }, [])

  const typeList = [
    { type: 0, name: "全部" },
    { type: 7, name: "华语" },
    { type: 96, name: "欧美" },
    { type: 16, name: "韩国" },
    { type: 8, name: "日本" },
  ]
  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      align: "right",
      render: (text, record, index) => `${index < 9 ? "0" : ""}${index + 1}`,
      onCell: () => ({ className: "index-col" }),
    },
    {
      title: "歌曲",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        return (
          <div className="name-box">
            <PlayImg
              size="80y80"
              src={record.album.picUrl}
              width="60px"
              height="60px"
              onClick={() => dbClick(record)}
            />
            <div className="name-box-right">{text}</div>
          </div>
        )
      },
    },
    {
      title: "歌手",
      dataIndex: ["artists", "0", "name"],
      key: "artists",
      ellipsis: true,
      render: (text, item) => (
        <>
          {item.artists.map((u, i) => (
            <span className="name" key={u.id}>
              {u.name}
              {item.artists.length === i + 1 ? "" : " / "}
            </span>
          ))}
        </>
      ),
    },
    {
      title: "专辑",
      dataIndex: ["album", "name"],
      key: "album",
      ellipsis: true,
      render: (text) => <span className="name">{text}</span>,
    },
    {
      title: "时长",
      dataIndex: "duration",
      key: "duration",
      render: (text) => formatDuration(text),
      onCell: () => ({ className: "duration-col" }),
    },
  ]
  // 获取列表
  const getNewSong = async (type) => {
    setLoading(true)
    const [err, res] = await to(getTopSong(type))
    res && setSongList(res.data || [])
    setLoading(false)
  }
  useEffect(() => {
    getNewSong(type)
    return () => {}
  }, [type])

  return (
    <>
      <div className="newsong-typebox">
        <div className="newsong-type">
          {typeList.map((item) => (
            <div
              className={classNames("item", { active: type === item.type })}
              key={item.type}
              onClick={() => setType(item.type)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className={classNames("newsong-play", { hiden: isLoading })}>
          <button className="backr">
            <PlayCircleOutlined />
            播放全部
          </button>
          <button>
            <FolderAddOutlined />
            收藏全部
          </button>
        </div>
      </div>
      <div className="newsong-list">
        <Table
          showHeader={false}
          pagination={false}
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={songList}
          loading={isLoading}
          onRow={(record) => {
            return {
              onDoubleClick: () => dbClick(record),
            }
          }}
        />
      </div>
    </>
  )
}
export default memo(NewMusic)
