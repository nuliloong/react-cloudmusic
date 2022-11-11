import { Modal } from "antd"
import React from "react"
import { memo } from "react"

function MyModal({ children, ...props }) {
  return <Modal {...props}>{children}</Modal>
}
export default memo(MyModal)
