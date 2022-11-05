import React, { memo } from "react"
import { RightOutlined } from "@ant-design/icons"
import classnames from "classnames"
import "./index.less"

function FindCollapse(props) {
  const { title, children, onClick, icon } = props

  // 处理图标
  const IconNode = () => {
    // icon属性为boolean并且为false,不显示图标
    if (typeof icon === "boolean" && !icon) return
    // 返回自定义图标
    if (icon) return icon
    // 返回默认图标
    return <RightOutlined />
  }

  // 标题点击事件
  const handleTitleClick = (event) => {
    onClick && onClick(event)
  }

  return (
    <>
      <div className="find-collapse">
        <div className="find-collapse-tilte">
          <span className={classnames({ "title-cursor": onClick })} onClick={handleTitleClick}>
            <span className="find-collapse-tilte-text">{title}</span>
            <span className="find-collapse-tilte-icon">
              <IconNode />
            </span>
          </span>
        </div>
        <div className="find-collapse-content">{children}</div>
      </div>
    </>
  )
}
export default memo(FindCollapse)
