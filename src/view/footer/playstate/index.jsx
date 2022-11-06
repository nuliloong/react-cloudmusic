import { setPlayState } from "@/redux/modules/play/action"
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
import { useEffect } from "react"
import { useRef } from "react"
import { memo } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import "./index.less"

function PlayState() {
  const audio = useRef(null)
  const dispatch = useDispatch()
  const { isPlaying, songurl } = useSelector(({ play }) => ({
    isPlaying: play.isPlaying,
    songurl: play.currentSongUrl,
  }))
  console.log("PlayState>>")
  // console.log("audio>>", audio)
  useEffect(() => {
    play(isPlaying)
  }, [isPlaying])

  const play = (val) => {
    const { current } = audio
    console.dir(current)
    current.volume = Number(localStorage.getItem("play_volumeSize") || "30") / 100
    if (val) {
      current.play()
      return
    }
    current.pause()
  }
  const playState = (val) => dispatch(setPlayState(val))
  return (
    <div className="playcontrol">
      <audio
        ref={audio}
        id="audio"
        autoPlay
        src={songurl}
        onPlay={() => playState(true)}
        onPause={() => playState(false)}
      ></audio>
      <div className="play-btn">
        <MenuUnfoldOutlined title="顺序" />
        {/* <RetweetOutlined title="列表循环" /> */}
        {/* <RetweetOutlined title="单曲循环" >1</RetweetOutlined> */}
        {/* <BranchesOutlined title="随机" /> */}
        <StepBackwardOutlined title="上一首" />

        {isPlaying ? (
          <PauseCircleOutlined className="play-stop" title="暂停播放" onClick={() => playState(false)} />
        ) : (
          <PlayCircleOutlined title="播放" className="play-stop" onClick={() => playState(true)} />
        )}

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
export default memo(PlayState)
