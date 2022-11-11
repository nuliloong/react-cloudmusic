import {
  SET_CURRENT_SONG_URL,
  CHANGE_PLAY_STATE,
  SAVE_SONG_DETAIL,
  ADD_PLAYINGLIST,
  CLEAR_PLAY_LIST,
  DELETE_SONG,
  SET_CURRENT_SECOND,
  SET_PLAYER_EXPAND
} from "../../constant";
import produce from 'immer';

const prevState = {
  // 音乐播放状态
  isPlaying: false,
  // 当前歌曲url
  currentSongUrl: localStorage.getItem('play_currentSongUrl') || '',
  // 当前下载音乐信息
  downloadMusicInfo: {},
  // 当前歌曲详情
  currentSongDetail: JSON.parse(localStorage.getItem('play_currentSongDetail') || '{}'),
  // 正在播放列表
  playingList: JSON.parse(localStorage.getItem('play_playingList') || '[]'),
  // 当前歌曲播放的实时秒数
  currentSecond: 0,
  // 当前歌曲播放的实时秒数
  playerExpand: false,
}
const playReducer = produce((draft, { type, data }) => {
  // 写法就和vuex中的mutation中的写法一样的，简化了
  // 操作数据无需深复制，提升性能
  switch (type) {
    case SET_CURRENT_SONG_URL:
      draft.currentSongUrl = data || ''
      localStorage.setItem('play_currentSongUrl', draft.currentSongUrl)
      break;
    case CHANGE_PLAY_STATE:
      draft.isPlaying = data
      break;
    case SET_CURRENT_SECOND:
      draft.currentSecond = data
      break;
    case ADD_PLAYINGLIST:
      // 如果歌曲已存在列表里则不添加
      if (draft.playingList.some(i => i.id === data.id)) break;
      draft.playingList.unshift(data)
      localStorage.setItem('play_playingList', JSON.stringify(draft.playingList))
      break;
    case CLEAR_PLAY_LIST:
      draft.playingList = data || []
      localStorage.setItem('play_playingList', JSON.stringify(draft.playingList))
      break;
    case DELETE_SONG:
      draft.playingList = draft.playingList.filter(i => i.id !== data)
      localStorage.setItem('play_playingList', JSON.stringify(draft.playingList))
      break;
    case SAVE_SONG_DETAIL:
      draft.currentSongDetail = data || {}
      localStorage.setItem("play_currentSongDetail", JSON.stringify(draft.currentSongDetail))
      break;
    case SET_PLAYER_EXPAND:
      draft.playerExpand = data
      break;
    default:
      return draft
  }
}, prevState)

export default playReducer