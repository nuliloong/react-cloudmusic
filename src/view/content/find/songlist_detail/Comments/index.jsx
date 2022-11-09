import { getPlaylistComment, isLikeComment, replyComment } from "@/api/modules/find"
import MyButton from "@/components/MyButton"
import { formatDate, httpToHttps, to } from "@/utils/util"
import { LikeOutlined, MessageOutlined } from "@ant-design/icons"
import { message } from "antd"
import { Spin, Avatar, Pagination, Input } from "antd"
const { TextArea } = Input
import classNames from "classnames"
import React, { useEffect, useState } from "react"
import { useRef } from "react"
import { useSelector } from "react-redux"
import "./index.less"

export default function Comments({ id, setCommentCount }) {
  // 评论列表
  const [commentList, setCommentList] = useState([])
  // 精彩评论
  const [hotComments, setHotComments] = useState([])
  // 加载中
  const [loading, setLoading] = useState(true)
  // 文本框值
  const [textValue, setTextValue] = useState("")
  // 文本框占位符
  const [placeholder, setPlaceholder] = useState("")
  // 回复用户
  const [commentId, setCommentId] = useState()
  // 文本框dom
  const textarea = useRef(null)
  // 分页信息
  const [page, setPage] = useState({
    pageIndex: 1,
    total: 0,
  })
  const { userId } = useSelector(({ user }) => ({
    userId: user.userId,
  }))
  // 获取评论
  const getComments = async (pageIndex) => {
    const [err, res] = await to(getPlaylistComment({ id, offset: (pageIndex - 1) * 30, limit: 30 }))
    if (res) {
      setCommentList(res.comments || [])
      setHotComments(res.hotComments || [])
      setPage({ pageIndex, total: res.total })
      setCommentCount(res.total)
      setLoading(false)
    }
  }
  useEffect(() => {
    getComments(page.pageIndex)
  }, [])
  // 点赞评论
  const clickLike = async (item) => {
    const t = item.liked ? 0 : 1
    const [err, res] = await to(isLikeComment({ id, cid: item.commentId, t, type: 2 }))
    if (res?.code === 200) {
      const newlist = commentList.map((i) => {
        if (i.commentId === item.commentId) {
          i.likedCount = i.likedCount + (t ? 1 : -1)
          item.liked = !!t
        }
        return i
      })
      setCommentList(newlist)
    }
  }
  // 评论
  const comment = async () => {
    if (!userId) {
      message.warn("该功能需要登录权限")
      return
    }
    if (!textValue.trim()) return
    const t = !commentId ? 1 : 2
    const [err, res] = await to(replyComment({ t, id, commentId, type: 2, content: textValue }))
    if (res && res.code === 200) {
      setTextValue("")
      message.success("发送成功!")
      setTimeout(() => {
        getComments(page.pageIndex)
      }, 200)
      setCommentId()
      setPlaceholder("")
      return
    }
    message.error("发送失败,请稍后重试!")
  }
  // 点击回复
  const commentItem = (item, e) => {
    setTextValue("")
    textarea.current.focus()
    setPlaceholder(`回复@${item.user.nickname}:`)
    setCommentId(item.commentId)
  }
  // 输入框失焦
  const onTextAreaBlur = (e) => {
    if (!e.target.value) {
      setPlaceholder("")
      setCommentId()
    }
  }

  return (
    <Spin spinning={loading}>
      <div className="comments">
        <div className="comments-reply">
          <TextArea
            ref={textarea}
            value={textValue}
            showCount
            maxLength={140}
            className="textarea"
            placeholder={placeholder}
            onChange={(e) => setTextValue(e.target.value)}
            onBlur={onTextAreaBlur}
          />
          <div style={{ textAlign: "right", paddingTop: "5px" }}>
            <MyButton onClick={comment}>评论</MyButton>
          </div>
        </div>
        {commentList.map((item) => (
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
                    onClick={() => clickLike(item)}
                  >
                    <LikeOutlined />
                    {item.likedCount || 0}
                  </span>
                  <MessageOutlined className="comm" onClick={(e) => commentItem(item, e)} />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="subscribers-pagination">
          <Pagination
            disabled={!commentList.length}
            current={page.pageIndex}
            total={page.total}
            pageSize={30}
            showSizeChanger={false}
            onChange={(pageIndex) => getComments(pageIndex)}
          />
        </div>
      </div>
    </Spin>
  )
}
