import { checkMusic, getSongUrl } from "@/api/modules/play"
import {
  clearPlayList,
  deleteSong,
  saveSongDetail,
  setPlayState,
  setSongUrl,
} from "@/redux/modules/play/action"
import {
  CaretRightOutlined,
  FolderAddOutlined,
  MinusCircleOutlined,
  PauseOutlined,
} from "@ant-design/icons"
import React, { memo } from "react"
import { Table, message } from "antd"
import { formatDuration, to } from "@/utils/util"
import { useDispatch, useSelector } from "react-redux"
import "./index.less"

function PlayList() {
  const dispatch = useDispatch()
  const { playingList, currentPlayId, isPlaying } = useSelector(({ play }) => ({
    playingList: play.playingList,
    currentPlayId: play.currentSongDetail?.id,
    isPlaying: play.isPlaying,
  }))
  // 当前播放项添加图标
  const PlayNode = ({ id }) => {
    if (id === currentPlayId) {
      if (isPlaying) {
        return <CaretRightOutlined />
      }
      return <PauseOutlined />
    }
  }
  /**
   * 当移除的id===当前播放音乐的id时
   * 判断播放列表长度
   * 大于1时，播放下一首音乐
   * 小于1时清空当前播放音乐信息
   */
  const delSong = (id) => {
    let next
    if (currentPlayId === id) {
      let index = playingList.findIndex((item) => currentPlayId === item.id)
      if (playingList.length > 1) {
        if (playingList.length - 1 === index) {
          next = playingList[index - 1]
        } else {
          next = playingList[index + 1]
        }
      } else {
        clearList()
        return
      }
    }
    if (next) {
      getNextSongUrl(next)
    }
    dispatch(deleteSong(id))
  }
  /**获取下一首音乐url */
  const getNextSongUrl = async (next) => {
    const [err, res] = await to(getSongUrl(next.id))
    if (res) {
      dispatch(setSongUrl(res.data[0].url)) // 保存当前下一首歌曲url
      dispatch(saveSongDetail(next)) // 保存当前下一首歌曲详情
    }
  }
  // 清空播放列表
  const clearList = () => {
    if (!playingList.length) return
    dispatch(setSongUrl())
    dispatch(setPlayState(false))
    dispatch(saveSongDetail())
    dispatch(clearPlayList())
  }
  /**播放音乐 */
  const playMusic = async (music) => {
    const [err, res] = await to(checkMusic(music.id))
    if (res.success) {
      const [err1, res1] = await to(getSongUrl(music.id))
      if (res1) {
        dispatch(setSongUrl(res1.data[0].url))
        dispatch(setPlayState(true)) // 更新播放状态
        dispatch(saveSongDetail(music)) // 保存当前歌曲详情
        // dispatch(addPlayinglist(music)) // 添加到播放列表
      }
      return
    }
    message.warning(res?.message || "暂时无法播放，换首试试")
  }
  // 双击处理
  const dbClick = (record) => {
    if (currentPlayId === record.id) return
    playMusic(record)
  }
  // 表格配置项
  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: "20px",
      render: (text, record) => <PlayNode id={record.id} />,
      onCell: () => ({ className: "cur-col" }),
    },
    {
      title: "歌曲",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "歌手",
      dataIndex: ["ar", "0", "name"],
      key: "artists",
      ellipsis: true,
    },
    {
      title: "时长",
      dataIndex: "dt",
      key: "dt",
      width: "45px",
      render: (text) => formatDuration(text),
      onCell: () => ({ className: "duration-col" }),
    },
    {
      title: "删除",
      dataIndex: "id",
      key: "id",
      width: "50px",
      onCell: () => ({ className: "del-col" }),
      render: (id) => (
        <MinusCircleOutlined
          title="从播放列表中移除"
          className="del-btn"
          onClick={() => delSong(id)}
        />
      ),
    },
  ]
  return (
    <div className="playlist-drawer-content">
      <div>
        <h1 className="title">当前播放</h1>
        <div className="operation">
          <div className="operation-count">总{playingList.length}首</div>
          <div className="operation-btn">
            <button className="btn star">
              <FolderAddOutlined />
              收藏全部
            </button>
            <button className="btn clear" onClick={clearList}>
              清空列表
            </button>
          </div>
        </div>
      </div>
      <div className="list">
        <Table
          showHeader={false}
          pagination={false}
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={playingList}
          description="xxx"
          rowClassName={(row) => (row.id === currentPlayId ? "play-row" : "")} // 高亮当前播放行
          onRow={(record) => {
            return {
              onDoubleClick: () => dbClick(record),
            }
          }}
        />
      </div>
    </div>
  )
}
export default memo(PlayList)
