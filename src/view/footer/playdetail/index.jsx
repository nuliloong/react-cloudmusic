import { getSongLyric } from "@/api/modules/play"
import { to } from "@/utils/util"
import { message } from "antd"
import { Drawer } from "antd"
import React, { memo } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"

function PlayDetail({ open }) {
  const [lyric, setLyric] = useState("")
  const { songId } = useSelector(({ play }) => ({
    songId: play.currentSongDetail?.id,
  }))
  // 获取歌词
  const getLyric = async () => {
    const [err, res] = await to(getSongLyric(songId))
    if (res && res.code === 200) {
      setLyric(res.lrc.lyric)
      return
    }
    message.error("获取歌词失败")
  }

  useEffect(() => {
    getLyric()
  }, [songId])

  return (
    <Drawer
      className="xxxxxxxxxx"
      placement="bottom"
      closable={false}
      mask={false}
      maskClosable={false}
      height="100vh"
      open={open}
      key="bottom"
      getContainer={document.querySelector(".ant-layout-has-sider")}
    >
      <button>xxxxx</button>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  )
}
export default memo(PlayDetail)
