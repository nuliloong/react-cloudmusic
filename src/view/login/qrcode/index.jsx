import { useDispatch, useSelector } from "react-redux"
import { Button, Spin } from "antd"
import React, { memo, useEffect, useState } from "react"
import { to } from "@/utils/util"
import { getQrKey, getQrBase, getQrState } from "@/api/modules/login"
import { CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons"
import phone from "@/assets/images/phone.png"
import "./index.less"
import { getAccountInfo } from "@/hooks/user"

const QrcodeLogin = (props) => {
  const [error, setError] = useState("")
  const [isConfirm, setConfirm] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [qrImg, setQrUrl] = useState("")
  const [isSuccess, setSuccess] = useState(false)
  const isModalOpen = useSelector(({ user }) => user.loginShow)
  const dispatch = useDispatch()

  // 轮询二维码状态
  let timer
  const pollingState = (key) => {
    const pollingQrState = async () => {
      const [err, res] = await to(getQrState(key))
      if (res.code === 803) {
        clearInterval(timer)
        setSuccess(true)
        timer = setTimeout(() => {
          getAccountInfo()
        }, 2000)
      }
      if (res.code === 800) {
        setConfirm(false)
        setError("二维码过期")
        clearInterval(timer)
      }
      if (res.code === 802) {
        setConfirm(true)
      }
    }
    timer = setInterval(pollingQrState, 2500)
  }
  // 获取二维码
  const getQrcode = async () => {
    setLoading(true)
    setError(null)
    const [err1, res1] = await to(getQrKey())
    if (err1) {
      setError(err1)
      return
    }
    const [err2, res2] = await to(getQrBase(res1.data.unikey))
    if (err2) {
      setError(err1)
      return
    }
    setLoading(false)
    setQrUrl(res2.data.qrimg)
    pollingState(res1.data.unikey)
  }

  const StateNode = () => {
    if (isSuccess) {
      return (
        <div className="qrcode-box-imgtext-text success">
          <div className="success-icon">
            <CheckCircleOutlined />
          </div>
          <div className="text">登录成功</div>
        </div>
      )
    }
    if (isConfirm) {
      return (
        <div className="qrcode-box-imgtext-text success">
          <div className="success-icon">
            <LoadingOutlined />
          </div>
          <div className="text">扫描成功，待确认</div>
        </div>
      )
    }
    if (error) {
      return (
        <div className="qrcode-box-imgtext-text">
          <div className="text">二维码已失效</div>
          <Button type="primary" size="small" onClick={getQrcode}>
            点击刷新
          </Button>
        </div>
      )
    }
  }

  useEffect(() => {
    if (isModalOpen) getQrcode()
    console.log("qr>>")
    return () => {
      clearInterval(timer)
    }
  }, [isModalOpen])
  return (
    <div className="qrcode">
      <div className="qrcode-title">扫码登录</div>
      <div className="qrcode-hover">
        <img className="qrcode-phone" src={phone} />
        <div className="qrcode-box">
          <Spin spinning={isLoading}>
            <div className="qrcode-box-imgtext">
              <StateNode />
              <img className="qrcode-box-img" src={qrImg} />
            </div>
          </Spin>
          <span className="qrcode-box-link">
            使用<a href="https://music.163.com/#/download">网易云音乐APP</a>扫码登录
          </span>
        </div>
      </div>
      <div className="qrcode-switch" onClick={() => props.setLoginModel(false)}>
        选择其它登录模式&gt;
      </div>
    </div>
  )
}
export default memo(QrcodeLogin)
