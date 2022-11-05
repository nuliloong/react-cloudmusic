import { SET_USER_ID, SET_LAYOUT_SIDER_WIDTH, CHANGE_LOGIN_SHOW, SET_USER_INFO } from "../../constant";
import produce from 'immer';

const prevState = {  
  /* 
  音乐播放
   */
  // 音乐播放状态
  isPlaying: false,
  // 当前下载音乐信息
  downloadMusicInfo: {},
  // 是否显示当前歌曲详情页
  isShowSongDetail: false,
  // 是否显示悬浮歌词
  showFloatLyric: false,
  // 当前播放歌曲歌词
  currentLyric: [],
  //当前歌曲url
  songUrl: " ",
  // 当前歌曲详情
  nowSongDetail: localStorage.getItem("nowSongDetail") ? JSON.parse(localStorage.getItem("nowSongDetail")) : {},
  //正在播放列表
  playingList: localStorage.getItem("playingList") ? JSON.parse(localStorage.getItem("playingList")) : [],
  // 历史播放列表
  historyPlay: localStorage.getItem("historyPlay") ? JSON.parse(localStorage.getItem("historyPlay")) : [],
  // 当前歌曲播放的实时秒数
  currentSecond: localStorage.getItem("currentSecond") ? JSON.parse(localStorage.getItem("currentSecond")) : 0,
  //当前歌曲播放的歌词行
  currentRow: localStorage.getItem("currentRow") ? JSON.parse(localStorage.getItem("currentRow")) : 0,
}
const userReducer = produce((draft, { type, data }) => {
  // 写法就和vuex中的mutation中的写法一样的，简化了
  // 操作数据无需深复制，提升性能
  switch (type) {
    case SET_USER_ID:
      draft.userId = data
      break;
    default:
      return draft
  }
}, prevState)

export default userReducer