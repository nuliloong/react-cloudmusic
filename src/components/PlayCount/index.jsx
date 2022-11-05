import { formatCount } from "@/utils/util"
import { memo } from "react"

import playo from "@/assets/images/play-o.svg";
import "./index.less"

const CountNode = ({ playCount }) => {
  if (!playCount) return
  return (
    <div className="play-count">
      <img src={playo} />
      {formatCount(playCount)}
    </div>
  )
}
export default memo(CountNode)
