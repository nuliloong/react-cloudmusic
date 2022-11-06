
import {
  SET_CURRENT_SONG_URL,
  CHANGE_PLAY_STATE,
  SAVE_SONG_DETAIL,
  ADD_PLAYINGLIST,
  CLEAR_PLAY_LIST,
  DELETE_SONG
} from "../../constant";
// import store from "./store.js";

/**修改当前播放音乐 */
export const setSongUrl = data => ({ type: SET_CURRENT_SONG_URL, data })
/**修改播放状态 */
export const setPlayState = data => ({ type: CHANGE_PLAY_STATE, data })
/**保存当前播放歌曲信息 */
export const saveSongDetail = data => ({ type: SAVE_SONG_DETAIL, data })
/**添加到播放列表 */
export const addPlayinglist = data => ({ type: ADD_PLAYINGLIST, data })
/**替换或清空播放列表 */
export const clearPlayList = data => ({ type: CLEAR_PLAY_LIST, data })
/**删除播放列表单个 */
export const deleteSong = data => ({ type: DELETE_SONG, data })


