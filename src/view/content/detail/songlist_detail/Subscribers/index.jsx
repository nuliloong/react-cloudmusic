import { getPlaylistSubscribers } from "@/api/modules/find"
import { httpToHttps, to } from "@/utils/util"
import { Spin } from "antd"
import { Pagination, Avatar } from "antd"
import React, { useState, useEffect } from "react"
import "./index.less"

export default function Subscribers({ id }) {
  const [list, setlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState({
    pageIndex: 1,
    total: 0,
  })
  // 获取歌单收藏者
  const getlist = async (pageIndex) => {
    const [err, res] = await to(
      getPlaylistSubscribers({ id, offset: (pageIndex - 1) * 30, limit: 30 })
    )
    if (res && res.subscribers) {
      setlist(res.subscribers)
      setPage({ pageIndex, total: res.total })
      setLoading(false)
    }
    console.log("res>>", res)
  }
  useEffect(() => {
    getlist(page.pageIndex)
  }, [id])

  return (
    <Spin spinning={loading}>
      <div className="subscribers">
        <div className="subscribers-list">
          {list.map((item) => (
            <div key={item.userId} className="subscribers-list-item">
              <div className="item-left">
                <Avatar size={70} src={httpToHttps(item.avatarUrl)} />
              </div>
              <div className="item-right">
                <span>{item.nickname}</span>
                {item.signature ? <span className="desc">{item.signature}</span> : null}
              </div>
            </div>
          ))}
        </div>
        <div className="subscribers-pagination">
          <Pagination
            disabled={!list.length}
            current={page.pageIndex}
            total={page.total}
            pageSize={30}
            showSizeChanger={false}
            onChange={(pageIndex) => getlist(pageIndex)}
          />
        </div>
      </div>
    </Spin>
  )
}
