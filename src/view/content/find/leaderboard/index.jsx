import { getToplist } from "@/api/modules/find"
import { to } from "@/utils/util"
import { Spin } from "antd"
import React, { useState, useEffect } from "react"
import GlobalList from "./global_list"
import "./index.less"
import OfficialList from "./official_list"

export default function Leaderboard() {
  const [isLoading, setLoading] = useState(true)
  const [official, setofficial] = useState([])
  const [global, setglobal] = useState([])
  // 获取榜单
  const getlist = async () => {
    const [err, res] = await to(getToplist())
    if (res) {
      const list = res?.list || []
      setofficial(list.splice(0, 4)) // 截取前4个
      setglobal([...list])
    }
    setLoading(false)
  }
  useEffect(() => {
    getlist()
  }, [])

  return (
    <Spin spinning={isLoading}>
      <div className="leaderboard">
        {/* 官方榜 */}
        {official.length ? <OfficialList list={official} /> : null}
        {/* 全球榜 */}
        {global.length ? <GlobalList list={global} /> : null}
      </div>
    </Spin>
  )
}
