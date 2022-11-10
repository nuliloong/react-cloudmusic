import {
  SET_USER_ID,
  SET_LAYOUT_SIDER_WIDTH,
  CHANGE_LOGIN_SHOW,
  SET_USER_INFO,
  SET_USER_SONG_LIST,
  SET_USER_LIKE_LIST
} from "../../constant";
// import store from "./store.js";



export const setLayoutSiderWidth = data => ({ type: SET_LAYOUT_SIDER_WIDTH, data })
export const changeLoginShow = data => ({ type: CHANGE_LOGIN_SHOW, data })

/**保存用户ID */
export const setUserId = data => ({ type: SET_USER_ID, data })
/**保存用户信息 */
export const setAccountInfo = (data) => ({ type: SET_USER_INFO, data })
/**修改用户歌单 */
export const setUserSongList = data => ({ type: SET_USER_SONG_LIST, data })
/**修改喜欢音乐列表 */
export const setUserLikeList = data => ({ type: SET_USER_LIKE_LIST, data })

