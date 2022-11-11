import React from "react"
import play from "@/assets/images/play.svg"
import "./index.less"
import ImgBox from "@/components/ImgBox"
import RightList from "./RightList"
import { useNavigate } from "react-router-dom"

export default function OfficialList(props) {
  const { list } = props
  console.log("list>>", list)
  const formatTime = (time) => {
    if (!time) return
    let _time = new Date(time)
    let month = _time.getMonth() + 1
    let day = _time.getDate()
    return `${month}月${day}日更新`
  }
  const navigate = useNavigate()
  const songlistClick = (item) => {
    navigate("/songlistdetail/"+item.id)
  }
  return (
    <div className="officiallist">
      <h2 className="officiallist-title">官方榜</h2>
      <div className="officiallist-list">
        {list.map((item) => (
          <div key={item.id} className="officiallist-list-item">
            <div className="item-left">
              <ImgBox onClick={() => songlistClick(item)} loading="lazy" size="220y220" src={item.coverImgUrl} className="img-box">
                <div className="playicon" onClick={() => songlistClick(item)}>
                  <img src={play} />
                </div>
                <span className="time">{formatTime(item.updateTime)}</span>
              </ImgBox>
            </div>
            <div className="item-right">
              <RightList id={item.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
