import { getLikeList, getUserAccount, getUserDetail, getUserSonglist } from "@/api/modules/login"
import store from "@/redux"
import {
  setAccountInfo,
  setUserId,
  setUserLikeList,
  setUserSongList,
} from "@/redux/modules/user/action"
import { to } from "@/utils/util"
import { message } from "antd"
// import { useEffect } from "react"
const { dispatch, getState } = store

/**获取账号信息 */
export const getAccountInfo = async () => {
  const [err1, res1] = await to(getUserAccount())
  if (err1) {
    message.error("获取账号信息失败")
    return { type: "" }
  }
  const [err2, res2] = await to(getUserDetail(res1.profile.userId))
  if (err2) {
    message.error("获取用户信息失败")
    return { type: "" }
  }
  res2.profile = Object.assign(res1.profile, res2.profile)
  dispatch(setAccountInfo(res2))            // 保存用户信息
  dispatch(setUserId(res2.profile.userId))  // 保存用户id
  getCurrentUserSongLIst()                  // 获取用户收藏歌单
  getUserLikeList()                         // 获取喜欢的歌曲
}

/**刷新登录 */
export const refreshUserInfo = () => {
  getAccountInfo()
}

/**退出登录 */
export const loginOut = () => {
  dispatch(setAccountInfo({}))
  dispatch(setUserId(""))
}

/**获取当前用户歌单 */
export const getCurrentUserSongLIst = async () => {
  const userId = getState().user.userId
  if (!userId) return
  const [err, res] = await to(getUserSonglist(userId))
  if (res && res.playlist) {
    dispatch(setUserSongList(res.playlist))
    return res.playlist
  } else {
    message.error("用户歌单获取失败")
  }
}

/**喜欢音乐列表 */
export const getUserLikeList = async () => {
  const userId = getState().user.userId
  if (!userId) return
  const [err, res] = await to(getLikeList(userId))
  if (res && res.ids) {
    dispatch(setUserLikeList(res.ids || []))
  } else {
    message.error("喜欢音乐列表获取失败")
  }
}

/**刷新用户信息 */
// export const initUserInfo = async () => {
//   const userId = getState().user.userId
//   if (!userId) return
//   useEffect(() => {
//     getCurrentUserSongLIst()
//     getUserLikeList()
//   }, [])
// }
