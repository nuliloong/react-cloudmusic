import { dailySignin } from "@/api/modules/login"
import { loginOut, refreshUserInfo } from "@/redux/modules/user/action"
import { to } from "@/utils/util"
import {
  CrownOutlined,
  CustomerServiceOutlined,
  DownCircleOutlined,
  LogoutOutlined,
  NodeIndexOutlined,
  RightOutlined,
  TaobaoOutlined,
  UserSwitchOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons"
import { message } from "antd"
import { Button } from "antd"
import React, { memo } from "react"
import { useSelector, useDispatch } from "react-redux"
import "./index.less"

function UserStateBox() {
  const dispatch = useDispatch()
  const { userLevel, eventCount, follows, followeds, vipType, isSignin } = useSelector(
    ({ user }) => ({
      userLevel: user.userInfo?.level || 0,
      eventCount: user.userInfo?.profile?.eventCount || 0,
      follows: user.userInfo?.profile?.follows || 0,
      followeds: user.userInfo?.profile?.followeds || 0,
      vipType: user.userInfo?.profile?.vipType,
      isSignin: new Date(user.userInfo?.userPoint?.updateTime).getDate() === new Date().getDate(),
    })
  )
  const logout = () => {
    dispatch(loginOut())
  }

  // 签到
  const signin = async () => {
    const [err, res] = await to(dailySignin())
    if (res) {
      message.success("签到成功")
      dispatch(refreshUserInfo())
    }
  }
  // 打开新标签
  const openTap = (href) => {
    return () => window.open(href)
  }
  return (
    <div className="userstate">
      <div className="dynamic">
        <div className="dynamic-item">
          <span className="count">{eventCount}</span>
          <span>动态</span>
        </div>
        <div className="dynamic-item">
          <span className="count">{follows}</span>
          <span>关注</span>
        </div>
        <div className="dynamic-item">
          <span className="count">{followeds}</span>
          <span>粉丝</span>
        </div>
      </div>
      <div className="signin">
        <Button shape="circle" disabled={isSignin} onClick={signin}>
          签到
        </Button>
      </div>
      <div className="linkbox">
        <div className="linkbox-item">
          <div className="icon">
            <DownCircleOutlined />
          </div>
          <div className="title">会员中心</div>
          <div className="state">
            {vipType ? "vip" : "未订购"} <RightOutlined />
          </div>
        </div>
        <div className="linkbox-item" onClick={openTap("https://music.163.com/#/user/level")}>
          <div className="icon">
            <CrownOutlined />
          </div>
          <div className="title">等级</div>
          <div className="state">
            lv.{userLevel} <RightOutlined />
          </div>
        </div>
        <div className="linkbox-item" onClick={openTap("https://music.163.com/store/product")}>
          <div className="icon">
            <TaobaoOutlined />
          </div>
          <div className="title">商城</div>
          <div className="state">
            <RightOutlined />
          </div>
        </div>
      </div>
      <div className="linkbox">
        <div className="linkbox-item">
          <div className="icon">
            <UserSwitchOutlined />
          </div>
          <div className="title">个人信息设置</div>
          <div className="state">
            <RightOutlined />
          </div>
        </div>
        <div className="linkbox-item">
          <div className="icon">
            <NodeIndexOutlined />
          </div>
          <div className="title">绑定社交账号</div>
          <div className="state">
            <WeiboCircleOutlined style={{ fontSize: "20px" }} />
            <RightOutlined />
          </div>
        </div>
      </div>
      <div className="linkbox">
        <div className="linkbox-item">
          <div className="icon">
            <CustomerServiceOutlined />
          </div>
          <div className="title">我的客服</div>
          <div className="state">
            <RightOutlined />
          </div>
        </div>
        <div className="linkbox-item" onClick={logout}>
          <div className="icon">
            <LogoutOutlined />
          </div>
          <div className="title">退出登录</div>
        </div>
      </div>
    </div>
  )
}
export default memo(UserStateBox)
