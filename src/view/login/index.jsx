import { changeLoginShow } from "@/redux/modules/user/action"
import { useDispatch, useSelector } from "react-redux"
import { Modal } from "antd"
import React, { memo, useState } from "react"
import QrcodeLogin from "./qrcode"
import PhoneLogin from "./phone"
import "./index.less"

const LoginModel = () => {
  const [isLoginModel, setLoginModel] = useState(true)
  const isModalOpen = useSelector(({ user }) => user.loginShow)
  const dispatch = useDispatch()

  const handleCancel = () => {
    dispatch(changeLoginShow(false))
  }

  return (
    <>
      <Modal
        open={isModalOpen}
        footer={null}
        maskClosable={false}
        width={350}
        wrapClassName="login-medal"
        onCancel={handleCancel}
      >
        <div className="login-box">
          {/* <div className={classNames({hidden:!isLoginModel})}><QrcodeLogin  setLoginModel={setLoginModel} /></div>
          <div className={classNames({hidden:isLoginModel})}><PhoneLogin  setLoginModel={setLoginModel} /></div> */}
          {isLoginModel ? <QrcodeLogin setLoginModel={setLoginModel} /> : <PhoneLogin setLoginModel={setLoginModel} />}
        </div>
      </Modal>
    </>
  )
}
export default memo(LoginModel)
