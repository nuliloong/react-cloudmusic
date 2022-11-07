import { get, post } from '../axios'

// 接口文档
// https://binaryify.github.io/NeteaseCloudMusicApi/#/

/**获取key */
export const getQrKey = () => get('/login/qr/key', { timerstamp: +new Date() })
/**获取二维码 */
export const getQrBase = (key) => get('/login/qr/create', { key, qrimg: true, timerstamp: +new Date() })
/**获取二维码状态 */
export const getQrState = (key) => get('/login/qr/check', { key, timerstamp: +new Date() })
/**
 * 刷新登录
 * 说明 : 调用此接口 , 可刷新登录状态,返回内容包含新的cookie(不支持刷新二维码登录的cookie)
 * 调用例子 : /login/refresh
 */
export const getUserInfo = () => get('/login/refresh')

// 手机登录
/**
  必选参数：
  phone: 手机号码
  password: 密码
  可选参数：
  countrycode: 国家码，用于国外手机号登录，例如美国传入：1
  md5_password: md5 加密后的密码,传入后 password 参数将失效
  captcha: 验证码,使用 /captcha/sent接口传入手机号获取验证码,调用此接口传入验证码,可使用验证码登录,传入后 password 参数将失效} phone 
 */
export const getPhoneLogin = ({ phone, password }) => get('/login/cellphone', { phone, password })


/**获取账号信息 */
export const getUserAccount = () => get('/user/account')
/**获取用户详情 */
export const getUserDetail = (uid) => get('/user/detail', { uid })


/**签到 */
export const dailySignin = () => get('/daily_signin', { type:1 })


