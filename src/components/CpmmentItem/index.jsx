import { formatDate, httpToHttps } from "@/utils/util"
import { LikeOutlined, MessageOutlined } from "@ant-design/icons"
import { Avatar } from "antd"
import classNames from "classnames"
import React from "react"
import "./index.less"

export default function Comment({list, onComment, onLike}) {
  

  return (
    <>
      {list.map((item) => (
        <div key={item.commentId} className="comments-item">
          <div className="comments-item-left">
            <Avatar size={45} src={httpToHttps(item?.user?.avatarUrl)} />
          </div>
          <div className="comments-item-right">
            {/* 主评论 */}
            <div className="commit">
              <span className="username">{item.user?.nickname}</span>：{item.content}
            </div>
            {/* 副评论 */}
            {item?.beReplied.length ? (
              <div className="bereplied">
                {item.beReplied.map((be) => (
                  <span key={be.beRepliedCommentId}>
                    <span className="username">@{be.user?.nickname}</span>：{be.content}
                  </span>
                ))}
              </div>
            ) : null}
            {/* 点赞区 */}
            <div className="operation">
              <div className="time">{formatDate(item.time, "yyyy-MM-dd hh:mm")}</div>
              <div className="interactive">
                <span
                  className={classNames("like", { liked: item.liked })}
                  onClick={() => onLike(item)}
                >
                  <LikeOutlined />
                  {item.likedCount || 0}
                </span>
                <MessageOutlined className="comm" onClick={(e) => onComment(item, e)} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
