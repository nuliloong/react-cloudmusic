import { to } from "@/utils/util"
import { checkMusic, getSongUrl } from "@/api/modules/play"
import {
  addPlayinglist,
  clearPlayList,
  saveSongDetail,
  setPlayState,
  setSongUrl,
} from "@/redux/modules/play/action"

import store from "@/redux"
import { message } from "antd"
const { dispatch, getState } = store
/**提取需要的歌曲信息 */
export const getSongInfo = (song) => {
  let nowSongInfo = { al: {}, ar: [{}] }
  nowSongInfo.id = song.id //歌曲id
  nowSongInfo.name = song.name //歌曲名
  nowSongInfo.dt = song.dt //歌曲时长
  nowSongInfo.al.picUrl = song.al?.picUrl || "" //专辑封面
  nowSongInfo.al.name = song.al.name //专辑名
  nowSongInfo.al.id = song.al.id //专辑id
  nowSongInfo.ar[0].name = song.ar[0].name //歌手名
  nowSongInfo.ar[0].id = song.ar[0].id //歌手id
  nowSongInfo.fee = song.fee //是否vip
  if (song.mv != 0) {
    nowSongInfo.mv = song.mv //mv的id
  }
  return nowSongInfo
}

/**提取需要的歌曲信息 */
export const getSongInfo2 = (song) => {
  let nowSongInfo = { al: {}, ar: [{}] }
  nowSongInfo.id = song.id //歌曲id
  nowSongInfo.name = song.name //歌曲名
  nowSongInfo.dt = song.duration //歌曲时长
  nowSongInfo.al.picUrl = song.album?.picUrl || "" //专辑封面
  nowSongInfo.al.name = song.album.name //专辑名
  nowSongInfo.al.id = song.album.id //专辑id
  nowSongInfo.ar[0].name = song.artists[0].name //歌手名
  nowSongInfo.ar[0].id = song.artists[0].id //歌手id
  nowSongInfo.fee = song.fee //是否vip
  if (song.mvid != 0) {
    nowSongInfo.mv = song.mvid //mv的id
  }
  return nowSongInfo
}
/**播放音乐 */
export const playMusic = async (music) => {
  const [err, res] = await to(checkMusic(music.id))
  if (res.success) {
    const [err1, res1] = await to(getSongUrl(music.id))
    if (res1) {
      dispatch(setSongUrl(res1.data[0].url))
      dispatch(setPlayState(true)) // 更新播放状态
      dispatch(saveSongDetail(getSongInfo(music))) // 保存当前歌曲详情
      dispatch(addPlayinglist(getSongInfo(music))) // 添加到播放列表
      return true
    }
    message.warning(res?.message || "暂时无法播放，换首试试")
    return
  }
  message.warning(res?.message || "暂时无法播放，换首试试")
}

// /**播放全部 */
// let flag = 0
// export const playAll = async (songList) => {
//   const result = await playMusic(songList[flag])
//   if (!result) {
//     flag++
//     playAll(songList)
//     return
//   }
//   const AllList = songList.map((item) => getSongInfo(item))
//   dispatch(clearPlayList(AllList))
// }

/**播放全部 */
export const playAll = (songList) => {
  let flag = 0
  const loop = async (list) => {
    const result = await playMusic(list[flag])
    if (!result) {
      flag++
      loop(list)
      return
    }
    const AllList = list.map((item) => getSongInfo(item))
    dispatch(clearPlayList(AllList))
  }
  loop(songList)
}


