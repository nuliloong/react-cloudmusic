import { getSongUrl } from "@/api/modules/play"
import { deleteSong, saveSongDetail, setPlayState, setSongUrl } from "@/redux/modules/play/action"
import { formatDuration, isNumber, randomOther, to } from "@/utils/util"
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
  SwapOutlined,
} from "@ant-design/icons"
import { message } from "antd"
import { Slider } from "antd"
import React, { useCallback, useState, useEffect, useRef, memo, Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./index.less"

function PlayState() {
  const audio = useRef(null)
  // 时长
  const [timelong, setTimelong] = useState({ num: 0, str: "00:00" })
  // 已播放时长
  const [timeplay, setTimePlay] = useState({ num: 0, str: "00:00" })
  // 播放条长度
  const [currentTime, setCurrentTime] = useState(0)
  // 播放模式
  const [playModel, setPlayModel] = useState(Number(localStorage.getItem("play_playModel") || 0))
  const dispatch = useDispatch()
  const { isPlaying, songurl, currentSongDetail, playingList } = useSelector(({ play }) => ({
    isPlaying: play.isPlaying,
    songurl: play.currentSongUrl,
    currentSongDetail: play.currentSongDetail,
    playingList: play.playingList,
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
      const time = Math.ceil((e.target.currentTime / audio.current.duration) * 100)
      if (time) {
        setCurrentTime(isNumber(time) ? time : 0)
      }
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
    setTimelong({ num: 0, str: "00:00" })
    setTimePlay({ num: 0, str: "00:00" })
    setCurrentTime(0)
    if (!songurl && !currentSongDetail.id) return
    const [err, res] = await to(getSongUrl(currentSongDetail.id))
    if (res && res?.data[0]?.url) {
      dispatch(setSongUrl(res.data[0].url))
    } else {
      dispatch(deleteSong(currentSongDetail.id))
      getNextSong()
      message.warning("改歌曲暂时无法播放，已切换下一首")
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

  /**获取下一首音乐url */
  const getNextSongUrl = async (next) => {
    const [err, res] = await to(getSongUrl(next.id))
    if (res) {
      dispatch(setSongUrl(res.data[0].url)) // 保存当前下一首歌曲url
      dispatch(saveSongDetail(next)) // 保存当前下一首歌曲详情
      dispatch(setPlayState(true))
    }
  }
  // 播放结束
  const getNextSong = () => {
    const index = playingList.findIndex((i) => i.id === currentSongDetail.id)
    switch (playModel) {
      case 0: // 顺序播放
        if (playingList.length > 1 && playingList.length - 1 !== index) {
          getNextSongUrl(playingList[index + 1])
        }
        break
      case 1: // 列表循环
        if (playingList.length > 1) {
          if (playingList.length - 1 === index) {
            getNextSongUrl(playingList[0])
          } else {
            getNextSongUrl(playingList[index + 1])
          }
        } else {
          audio.current.play()
        }
        break
      case 2: // 单曲循环
        audio.current.play()
        break
      case 3: // 随机播放
        if (playingList.length > 1) {
          // 排除当前的其他歌曲
          const random = randomOther(index, playingList.length)
          getNextSongUrl(playingList[random])
        } else {
          audio.current.play()
        }
        break
    }
  }

  // 切歌
  const toggleSong = (type) => {
    if (type === "next") {
      getNextSong()
      return
    }
    const index = playingList.findIndex((i) => i.id === currentSongDetail.id)
    if (playingList.length > 1) {
      if ([0, 1, 2].includes(playModel)) {
        // 顺序播放||列表循环
        if (playingList.length > 1) {
          getNextSongUrl(playingList[index === 0 ? playingList.length - 1 : index - 1])
        }
      } else {
        // 排除当前的其他歌曲
        const random = randomOther(index, playingList.length)
        getNextSongUrl(playingList[random])
      }
    }
  }
  const playModelClick = () => {
    const type = playModel < 3 ? playModel + 1 : 0
    setPlayModel(type)
    localStorage.setItem("play_playModel", type)
  }
  const PlayModel = useRef([
    <MenuUnfoldOutlined title="顺序" />,
    <RetweetOutlined title="列表循环" />,
    <SwapOutlined title="单曲循环" />,
    <BranchesOutlined title="随机" />,
  ])
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
        onEnded={getNextSong}
        // onTimeUpdate={onTimeUpdate}
      ></audio>
      <div className="play-btn">
        {/* 播放模式 */}

        {PlayModel.current.map((item, index) => (
          <div
            onClick={playModelClick}
            key={"model" + index}
            className={playModel !== index ? "display" : null}
          >
            {item}
          </div>
        ))}
        <StepBackwardOutlined title="上一首" onClick={() => toggleSong("prev")} />

        {isPlaying ? (
          <PauseCircleOutlined
            className="play-stop"
            title="暂停播放"
            onClick={() => playState(false)}
          />
        ) : (
          <PlayCircleOutlined title="播放" className="play-stop" onClick={() => playState(true)} />
        )}

        <StepForwardOutlined title="下一首" onClick={() => toggleSong("next")} />
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
