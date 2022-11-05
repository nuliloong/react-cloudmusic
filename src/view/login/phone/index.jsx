import React, { memo, useRef, useState } from "react"
import { Input, Select, Button, Checkbox, message as Message, Tooltip } from "antd"
import { ExclamationCircleOutlined, LockOutlined, QqOutlined, WechatOutlined, WeiboOutlined } from "@ant-design/icons"
import ewmTip from "@/assets/images/ewm-tip.png"
import phone from "@/assets/images/phone-login.png"
import "./index.less"
import { to } from "@/utils/util"
import { getPhoneLogin } from "@/api/modules/login"
import { useDispatch } from "react-redux"
import { setAccountInfo, setUserId } from "@/redux/modules/user/action"
const { Option } = Select

const PhoneLogin = (props) => {
  // /countries/code/list 国家编码
  const passwordDom = useRef(null)
  const dispatch = useDispatch()
  const [message, setmessage] = useState("")
  const [loading, setloading] = useState(false)
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    countrycode: "+86",
    privacy: false,
    privacyTip: false,
  })
  const setPhone = (e) => setFormData({ ...formData, phone: e.target.value })
  const setPassword = (e) => setFormData({ ...formData, password: e.target.value })
  const setCountrycode = (value) => setFormData({ ...formData, countrycode: value })
  const onPrivacy = (e) => setFormData({ ...formData, privacyTip: false, privacy: e.target.checked })

  const rewrite = () => {
    console.log("重设密码")
    Message.info('暂未开发')
  }
  // 验证表单
  const validateForm = () => {
    const { phone, password, privacy } = formData
    if (!privacy) {
      setFormData({ ...formData, privacyTip: true })
      return
    }
    if (!phone || !/^1[0-9]{10}$/.test(phone)) {
      setmessage("请输入11位数手机号")
      return
    }
    if (!password) {
      setmessage("请输入密码")
      return
    }
    setmessage("")
    return true
  }
  // 提交表单
  const submit = async () => {
    const isFlag = validateForm()
    if (!isFlag) return
    setloading(true)
    const [err, res] = await to(getPhoneLogin(formData))
    if (err) {
      setloading(false)
      setmessage("手机号或密码错误")
      return
    }
    if (res) {
      console.log('res>>', res)
      setloading(false)
      Message.success("登录成功")
      dispatch(setAccountInfo(res))
      dispatch(setUserId(res.profile.userId))
    }
  }
  return (
    <div className="phone">
      <div className="phone-ewm">
        <img src={ewmTip} onClick={props.setLoginModel} />
      </div>
      <div className="phone-banner">
        <img className="img" src={phone} />
      </div>

      <div className="phone-inputbox">
        <div style={{ width: "260px" }}>
          <Input.Group compact>
            <Select size="large" onChange={setCountrycode} defaultValue={formData.countrycode}>
              <Option value="+86">+86</Option>
            </Select>
            <Input size="large" maxLength={11} onChange={setPhone} placeholder="请输入手机号" />
          </Input.Group>
          <Input.Group compact>
            <Input.Password
              ref={passwordDom}
              prefix={<LockOutlined />}
              size="large"
              onChange={setPassword}
              placeholder="请输入密码"
            />
            <Button type="link" maxLength={20} size="large" onClick={rewrite}>
              重设密码
            </Button>
          </Input.Group>
        </div>
      </div>
      <div className="phone-btn">
        <div className="auto">
          <Checkbox disabled>自动登录</Checkbox>
          <div className="message">
            {message ? (
              <>
                <ExclamationCircleOutlined />
                <span>{message}</span>
              </>
            ) : undefined}
          </div>
        </div>
        <Button loading={loading} type="primary" size="large" className="login" onClick={submit}>
          {loading ? "登录中" : "登录"}
        </Button>
        <span className="register">注册</span>
        <div className="thirdparty">
          <WechatOutlined />
          <QqOutlined />
          <WeiboOutlined />
        </div>
        <div className="privacy">
          <Tooltip placement="topLeft" title="请同意隐私条款" open={formData.privacyTip}>
            <Checkbox onChange={onPrivacy}>同意</Checkbox>
          </Tooltip>

          <a href="https://st.music.163.com/official-terms/service" target="_blank">
            《服务条款》
          </a>
          <a href="https://st.music.163.com/official-terms/service" target="_blank">
            《隐私政策》
          </a>
          <a href="https://st.music.163.com/official-terms/service" target="_blank">
            《儿童隐私政策》
          </a>
        </div>
      </div>
    </div>
  )
}
export default memo(PhoneLogin)
