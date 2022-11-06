import { SET_USER_ID, SET_LAYOUT_SIDER_WIDTH, CHANGE_LOGIN_SHOW, SET_USER_INFO } from "../../constant";
import produce from 'immer';

const prevState = {
  /**用户信息 */
  userInfo: JSON.parse(localStorage.getItem('user_info') || '{}'),
  /**用户id */
  userId: localStorage.getItem('user_id') || '',
  /**系统设置 */
  userConfiguration: {
    layoutSiderWidth: 200
  },
  /**登录弹窗 */
  loginShow: false,
}
const userReducer = (state = prevState, { type, data }) =>
  produce(state, draft => {
    switch (type) {
      case SET_USER_ID:
        draft.userId = data
        console.log('data>>', data)
        localStorage.setItem('user_id', data)
        break;
      case SET_LAYOUT_SIDER_WIDTH:
        // Object.assign(draft.userConfiguration,{layoutSiderWidth: data})
        draft.userConfiguration.layoutSiderWidth = data
        break;
      case CHANGE_LOGIN_SHOW:
        draft.loginShow = data
        break;
      case SET_USER_INFO:
        draft.userInfo = data
        localStorage.setItem('user_info', JSON.stringify(data))
        break;
      default:
        return draft
    }
  });
const userReducer2 = produce((draft, { type, data }) => {
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