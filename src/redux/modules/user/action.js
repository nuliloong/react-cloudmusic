import { getUserAccount, getUserDetail } from "@/api/modules/login";
import { to } from "@/utils/util";
import { message } from 'antd';
import { SET_USER_ID, SET_LAYOUT_SIDER_WIDTH, CHANGE_LOGIN_SHOW, SET_USER_INFO } from "../../constant";
// import store from "./store.js";



export const setLayoutSiderWidth = data => ({ type: SET_LAYOUT_SIDER_WIDTH, data })
export const changeLoginShow = data => ({ type: CHANGE_LOGIN_SHOW, data })

/**保存用户ID */
export const setUserId = data => ({ type: SET_USER_ID, data })
/**保存用户信息 */
export const setAccountInfo = (data) => ({ type: SET_USER_INFO, data })
/**获取账号信息 */
export const getAccountInfo = async () => {
  const [err1, res1] = await to(getUserAccount())
  if (err1) {
    message.error('获取账号信息失败');
    return { type: '' }
  }
  const [err2, res2] = await to(getUserDetail(res1.profile.userId))
  if (err2) {
    message.error('获取用户信息失败');
    return { type: '' }
  }
  res2.profile = Object.assign(res1.profile, res2.profile)
  return (dispatch) => {
    dispatch(setAccountInfo(res2))
    dispatch(setUserId(res2.profile.userId))
  }
}
/**退出登录 */
export const loginOut = () => (dispatch) => {
  dispatch(setAccountInfo({}))
  dispatch(setUserId(''))
}
/**刷新登录 */
export const refreshUserInfo = async () => {
  return (dispatch) => {
    dispatch(getAccountInfo())
  }
}
