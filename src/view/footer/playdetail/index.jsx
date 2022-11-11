import { getCommentMusic, getSongLyric } from "@/api/modules/play"
import { formatLyric, to } from "@/utils/util"
import { message, Drawer, Input, Pagination, Spin } from "antd"
import React, { memo, useEffect, useState, useRef } from "react"
// import { useSelector } from "react-redux"
import record1 from "@/assets/record1.png"
import record2 from "@/assets/record2.png"
import "./index.less"
import classNames from "classnames"
import Comment from "@/components/CpmmentItem"
import { isLikeComment, replyComment } from "@/api/modules/find"
// import { useDispatch } from "react-redux"
import { setPlayerExpand } from "@/redux/modules/play/action"
import { DownOutlined } from "@ant-design/icons"
import { connect } from "react-redux"
import { useCallback } from "react"
import MyModal from "@/components/MyModal"
import MyButton from "@/components/MyButton"
const { TextArea } = Input

function PlayDetail(props) {
  const {
    open,
    playerExpand,
    songId,
    al,
    isPlaying,
    currentSecond,
    currentSongDetail,
    ar,
    setPlayerExpand,
    userId,
  } = props
  // const dispatch = useDispatch()
  const [lyric, setLyric] = useState([])
  const [commentLoading, setCommentLoading] = useState(false)
  const [commentList, setCommentList] = useState([])
  const [currentRow, setcurrentRow] = useState(0)
  const lyricbox = useRef()
  const scrollbox = useRef()
  const commentbox = useRef()
  // 分页信息
  const [page, setPage] = useState({
    pageIndex: 1,
    total: 0,
  })
  // 获取歌词
  const getLyric = useCallback(async () => {
    const [err, res] = await to(getSongLyric(songId))
    if (res && res.code === 200) {
      setLyric(formatLyric(res.lrc.lyric))
      return
    }
    message.error("获取歌词失败")
  }, [songId])
  // 获取评论
  const getComment = useCallback(
    async (pageIndex) => {
      setCommentLoading(true)
      const [err, res] = await to(
        getCommentMusic({ id: songId, offset: (pageIndex - 1) * 30, limit: 30 })
      )
      if (res && res.code === 200) {
        setCommentList(res.comments || [])
        setPage({ pageIndex, total: res.total })
      } else {
        message.error("获取评论失败")
      }
      setCommentLoading(false)
    },
    [songId]
  )
  const pageinationChange = useCallback(async (pageIndex) => {
    await getComment(pageIndex)
    scrollbox.current.scrollTo({ top: commentbox.current.offsetTop - 60, behavior: "smooth" })
  }, [])

  useEffect(() => {
    setPage({ pageIndex: 1, total: 0 })
    getComment(1)
    getLyric()
  }, [songId])
  useEffect(() => {
    currentLyric(currentSecond)
  }, [currentSecond])
  // 当前播放歌词
  const currentLyric = (currentSecond) => {
    if (!currentLyric) return
    const index = lyric.findIndex((item) => item.time === Math.ceil(currentSecond))
    if (index >= 0) {
      setcurrentRow(index)
      lyricbox.current.scrollTo({
        top: 32 * index,
        behavior: "smooth",
      })
    }
  }
  // 点赞评论
  const clickLike = async (item) => {
    const t = item.liked ? 0 : 1
    const [err, res] = await to(isLikeComment({ id: songId, cid: item.commentId, t, type: 0 }))
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
  const changeDrawer = () => {
    setPlayerExpand(!playerExpand)
    // dispatch(setPlayerExpand(!playerExpand))
  }
  useEffect(() => {
    if (open) getComment(page.pageIndex)
  }, [open])
  // 评论

  const [commentModal, setCommentModal] = useState(false)
  // 文本框值
  const [textValue, setTextValue] = useState("")
  // 回复用户
  const [commentId, setCommentId] = useState()
  // 文本框dom
  const textarea = useRef(null)
  // 文本框占位符
  const [placeholder, setPlaceholder] = useState("")
  // 点击回复
  const commentItem = (item, e) => {
    setCommentModal(true)
    setTimeout(() => {
      setTextValue("")
      textarea.current.focus()
      setPlaceholder(`回复@${item.user.nickname}:`)
      setCommentId(item.commentId)
    }, 0)
  }
  const comment = async () => {
    if (!userId) {
      message.warn("该功能需要登录权限")
      return
    }
    if (!textValue.trim()) return
    const t = !commentId ? 1 : 2
    const [err, res] = await to(replyComment({ t, id, commentId, type: 0, content: textValue }))
    if (res && res.code === 200) {
      setTextValue("")
      message.success("发送成功!")
      setTimeout(() => {
        getComment(page.pageIndex)
      }, 200)
      setCommentId()
      setPlaceholder("")
      setCommentModal(false)
      return
    }
    message.error("发送失败,请稍后重试!")
  }
  // 输入框关闭
  const modalafterClose = () => {
    setCommentModal(false)
    setPlaceholder("")
    setCommentId()
  }
  return (
    <Drawer
      className="palydetail"
      placement="bottom"
      closable={false}
      mask={false}
      maskClosable={false}
      height="100vh"
      open={open}
      key="bottom"
      getContainer={document.querySelector(".ant-layout-has-sider")}
    >
      <div className="playdetailbox">
        <img src={al?.picUrl || ""} className="drawerbg" />
        <div className="playdetailbox-header">
          <DownOutlined onClick={changeDrawer} />
        </div>
        <div className="playdetailbox-scrollbox" ref={scrollbox}>
          <div className="playdetailbox-title">
            <div className="songname">{currentSongDetail.name}</div>
            <div>{ar[0].name}</div>
          </div>
          <div className="playdetailbox-main">
            <div className="playdetailbox-main-record">
              <img src={record1} className={classNames("pointer", { play: isPlaying })} />
              <div className={classNames("record", { play: isPlaying })}>
                <img src={record2} className="recordbg" />
                <img src={al?.picUrl || ""} className="picurl" />
              </div>
            </div>
            <div className="playdetailbox-main-lyric scrollbar-hover" ref={lyricbox}>
              {lyric.map((item, index) => (
                <div key={index} className="lyric-item">
                  <div className={classNames("lyric-text", { active: currentRow == index })}>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="playdetailbox-comment" ref={commentbox}>
            <div className="playdetailbox-comment-new">最新评论（{page.total}）</div>
            <Spin spinning={commentLoading}>
              <Comment list={commentList} onComment={commentItem} onLike={clickLike} />
              <div className="playdetailbox-comment-pagination">
                <Pagination
                  disabled={!commentList.length}
                  current={page.pageIndex}
                  total={page.total}
                  pageSize={30}
                  showSizeChanger={false}
                  onChange={pageinationChange}
                />
              </div>
            </Spin>
            <MyModal
              title="评论"
              footer={false}
              maskClosable={false}
              open={commentModal}
              onCancel={modalafterClose}
              afterClose={modalafterClose}
              className="comment-modal"
            >
              <TextArea
                ref={textarea}
                value={textValue}
                showCount
                maxLength={140}
                className="textarea"
                placeholder={placeholder}
                onChange={(e) => setTextValue(e.target.value)}
              />
              <div style={{ textAlign: "right", paddingTop: "5px" }}>
                <MyButton onClick={comment}>评论</MyButton>
              </div>
            </MyModal>
          </div>
        </div>
      </div>
    </Drawer>
  )
}
export default connect(
  ({ play, user }) => ({
    songId: play.currentSongDetail?.id,
    al: play.currentSongDetail?.al || {},
    ar: play.currentSongDetail?.ar || [],
    currentSongDetail: play.currentSongDetail || {},
    isPlaying: play.isPlaying,
    currentSecond: play.currentSecond,
    playerExpand: play.playerExpand,
    userId: user.userId,
  }),
  {
    setPlayerExpand,
  }
)(memo(PlayDetail))
// export default memo(PlayDetail)
