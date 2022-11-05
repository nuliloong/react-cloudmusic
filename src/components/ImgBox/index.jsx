import React, { memo } from "react"
import Img from "@c/Img"

// <ImgBox
//   loading="lazy"
//   size="220y220"
//   src={item.picUrl}
//   className="img-box"
//   width="100%"
//   height="100%"
// >
//   <div className="playicon">
//     <img src={play} />
//   </div>
// </ImgBox>
// 类引入

// .img-box{
//   .img-box(100%);
// }
const ImgBox = (props) => {
  const { children, src, className, size, ...other } = props
  return (
    <div className={`img-box ${className || ""}`}>
      <Img className="img" {...other} size={size} src={src} />
      {children}
    </div>
  )
}

export default memo(ImgBox)
