import {
  BranchesOutlined,
  CaretRightOutlined,
  MenuUnfoldOutlined,
  PauseCircleOutlined,
  PauseOutlined,
  PlayCircleOutlined,
  RetweetOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons"
import { Slider } from "antd"
import React from "react"
import "./index.less"

export default function PlayControl() {
  return (
    <div className="playcontrol">
      <div className="play-btn">
        <MenuUnfoldOutlined title="顺序" />
        {/* <RetweetOutlined title="列表循环" /> */}
        {/* <RetweetOutlined title="单曲循环" >1</RetweetOutlined> */}
        {/* <BranchesOutlined title="随机" /> */}
        <StepBackwardOutlined title="上一首" />
        <PlayCircleOutlined title="播放" className="play-stop" />
        {/* <PauseCircleOutlined className="play-stop" title="暂停播放" /> */}
        <StepForwardOutlined title="下一首" />
        <div className="anticon lyric">词</div>
      </div>
      <div className="play-slider">
        <div className="time-start">99:00:00</div>
        <Slider />
        <div className="time-end">99:99:99</div>
      </div>
    </div>
  )
}
