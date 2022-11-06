import { getSongUrl } from "@/api/modules/play"
import { setPlayState, setSongUrl } from "@/redux/modules/play/action"
import { formatDuration, to } from "@/utils/util"
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
import React, { useCallback, useState, useEffect, useRef, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./index.less"

function PlayState() {
  const audio = useRef(null)
  // 时长
  const [timelong, setTimelong] = useState({ num: 0, str: "00:00" })
  // 已播放时长
  const [timeplay, setTimePlay] = useState({ num: 0, str: "00:00" })
  const [currentTime, setCurrentTime] = useState(0)
  const dispatch = useDispatch()
  const { isPlaying, songurl, currentSongDetail } = useSelector(({ play }) => ({
    isPlaying: play.isPlaying,
    songurl: play.currentSongUrl,
    currentSongDetail: play.currentSongDetail,
  }))
  useEffect(() => {
    if (isPlaying) {
      // 手动监听可以在拖动播放条时更丝滑
      audio.current.addEventListener("timeupdate", onTimeUpdate)
    }
    play(isPlaying)
    return () => {
      audio.current.removeEventListener("timeupdate", onTimeUpdate)
    }
  }, [isPlaying])
  // 音乐加载完成获取时长
  const onLoadedMetadata = (e) => {
    setTimelong({
      num: e.target.duration,
      str: formatDuration(Math.ceil(e.target.duration)),
    })
  }
  // 监听音乐播放，获取已播放时长
  const onTimeUpdate = useCallback(
    (e) => {
      // 修改当前播放时间文字
      setTimePlay({ num: e.target.currentTime, str: formatDuration(e.target.currentTime) })
      // 修改播放条长度
      setCurrentTime(Math.ceil((e.target.currentTime / timelong.num) * 100))
    },
    [timelong]
  )
  // 拖动播放条
  const sliderChange = (val) => {
    // 左右拖动播放条时，移除播放监听，解决时长变动时奇怪的声音
    audio.current.removeEventListener("timeupdate", onTimeUpdate)
    setCurrentTime(val)
    // 拖动时修改左边时长文字
    setTimePlay({ str: formatDuration(Math.ceil((val / 100) * timelong.num)) })
  }
  // 拖动播放条结束后，立即监听播放事件，并修改播放时间
  const sliderAfterChange = (val) => {
    audio.current.addEventListener("timeupdate", onTimeUpdate)
    const { current } = audio
    current.currentTime = Math.ceil((val / 100) * timelong.num)
  }

  // 当在加载期间发生错误时
  const onError = async () => {
    if (!songurl) return
    const [err, res] = await to(getSongUrl(currentSongDetail.id))
    if (res) {
      dispatch(setSongUrl(res.data[0].url))
    }
  }
  // 播放或暂停
  const play = (val) => {
    if (!songurl) return
    const { current } = audio
    if (!current) return
    current.volume = Number(localStorage.getItem("play_volumeSize") || "25") / 100
    if (val) {
      current.play()
      return
    }
    current.pause()
  }
  // 修改播放状态
  const playState = (val) => {
    if (!songurl) return
    dispatch(setPlayState(val))
  }
  return (
    <div className="playcontrol">
      <audio
        ref={audio}
        id="audio"
        autoPlay
        src={songurl}
        onPlay={() => playState(true)}
        onPause={() => playState(false)}
        onLoadedMetadata={onLoadedMetadata}
        onError={onError}
        // onTimeUpdate={onTimeUpdate}
      ></audio>
      <div className="play-btn">
        <MenuUnfoldOutlined title="顺序" />
        {/* <RetweetOutlined title="列表循环" /> */}
        {/* <RetweetOutlined title="单曲循环" >1</RetweetOutlined> */}
        {/* <BranchesOutlined title="随机" /> */}
        <StepBackwardOutlined title="上一首" />

        {isPlaying ? (
          <PauseCircleOutlined
            className="play-stop"
            title="暂停播放"
            onClick={() => playState(false)}
          />
        ) : (
          <PlayCircleOutlined title="播放" className="play-stop" onClick={() => playState(true)} />
        )}

        <StepForwardOutlined title="下一首" />
        <div className="anticon lyric">词</div>
      </div>
      <div className="play-slider">
        <div className="time-start">{timeplay.str}</div>
        <Slider value={currentTime} onChange={sliderChange} onAfterChange={sliderAfterChange} />
        <div className="time-end">{timelong.str}</div>
      </div>
    </div>
  )
}
export default memo(PlayState)
