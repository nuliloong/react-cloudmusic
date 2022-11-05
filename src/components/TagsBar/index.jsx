import classNames from "classnames"
import React from "react"
import { memo } from "react"
import "./index.less"

function TagBar(props) {
  const { tagList, onChange, value, valuekey } = props
  return (
    <div className="tagbox">
      <div className="tagbox-category">{tagList.category}：</div>
      <div className="tagbox-list">
        {tagList.list.map((item) => (
          <div className="tagbox-btn" key={item[valuekey]}>
            <button
              className={classNames("tagbox-list-tagbtn", {
                "tagbox-list-active": value === item[valuekey],
              })}
              onClick={() => onChange(item[valuekey], item)}
            >
              {item.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default memo(TagBar)
