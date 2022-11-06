import { SoundOutlined, UnorderedListOutlined } from "@ant-design/icons"
import { Drawer, Slider } from "antd"
import React, { useState, memo, useCallback } from "react"
import PlayList from "../playlist"
import "./index.less"

function VolumeControl() {
  console.log("VolumeControl>>")
  const [open, setOpen] = useState(false)
  const [sliderValue, setSliderValue] = useState(localStorage.getItem("play_volumeSize") || 30)
  // 显示播放列表
  const showList = (state) => {
    setOpen(state)
  }
  // 音量变化
  const volumeSizeChange = useCallback((value) => {
    const audio = document.getElementById("audio")
    audio.volume = value / 100
    setSliderValue(value)
  }, [])
  // 将最终值保存
  const changeUp = (value) => localStorage.setItem("play_volumeSize", value)
  return (
    <div className="volumecontrol">
      <SoundOutlined className="vbtn" />
      <Slider defaultValue={sliderValue} onChange={volumeSizeChange} onAfterChange={changeUp} />
      <UnorderedListOutlined className="v-musiclist" onClick={()=>showList(!open)} />
      {/* <BarsOutlined /> */}
      <Drawer
        placement="right"
        width={420}
        onClose={()=>showList(false)}
        closable={false}
        // mask={false}
        maskStyle={{backgroundColor: '#00000000'}}
        open={open}
        // getContainer={document.querySelector('.ant-layout-footer')}
        className="playlist-drawer"
        key="playlist_drawer"
      >
        <PlayList />
      </Drawer>
    </div>
  )
}
export default memo(VolumeControl)
