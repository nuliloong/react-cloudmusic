import { BarsOutlined, SoundOutlined, UnorderedListOutlined } from "@ant-design/icons"
import { Drawer } from "antd"
import { Slider } from "antd"
import React from "react"
import { useState } from "react"
import "./index.less"

export default function VolumeControl() {
  const [open, setOpen] = useState(false)
  const showList = () => {
    setOpen(!open)
  }
  return (
    <div className="volumecontrol">
      <SoundOutlined className="vbtn" />
      <Slider />

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
