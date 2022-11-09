import { formatDuration, to } from "@/utils/util"
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons"
import { Table, message } from "antd"
import React, { memo } from "react"
import { useSelector } from "react-redux"
import { playMusic } from "@h/play"
import "./index.less"
function PlayList(props) {
  const { songs, loading } = props
  const { currentPlayId, isPlaying } = useSelector(({ play }) => ({
    currentPlayId: play.currentSongDetail?.id,
    isPlaying: play.isPlaying,
  }))

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
  // 音乐名称
  const MusicName = (props) => {
    const { record } = props
    return (
      <div className="songname">
        <div className="name">
          {record.name}
          {record.alia?.length ? <span className="album">（{record.alia[0]}）</span> : null}
        </div>
        {record.fee == 1 ? <span className="vip">vip</span> : null}
        {record.mv != 0 ? <span className="mv">mv</span> : null}
      </div>
    )
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
      // ellipsis: true,
      render: (text, record, index) => <MusicName record={record} />,
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
    <div className="playlist">
      <Table
        loading={loading}
        pagination={false}
        size="small"
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={songs}
        onRow={(record) => {
          return {
            onDoubleClick: () => playMusic(record),
          }
        }}
      />
    </div>
  )
}
export default memo(PlayList)
