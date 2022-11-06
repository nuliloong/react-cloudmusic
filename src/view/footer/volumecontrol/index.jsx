import { BarsOutlined, SoundOutlined, UnorderedListOutlined } from "@ant-design/icons"
import { Drawer, Slider } from "antd"
import React, { useState } from "react"
import { useCallback } from "react"
import { memo } from "react"
import "./index.less"

function VolumeControl() {
  console.log("VolumeControl>>")
  const [open, setOpen] = useState(false)
  const [sliderValue, setSliderValue] = useState(localStorage.getItem("play_volumeSize") || 30)
  // 显示播放列表
  const showList = () => {
    setOpen(!open)
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
      <UnorderedListOutlined className="v-musiclist" onClick={showList} />
      {/* <BarsOutlined /> */}
      <Drawer
        title="当前播放"
        placement="right"
        onClose={showList}
        closable={false}
        open={open}
        key="volumecontrol"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  )
}
export default memo(VolumeControl)
