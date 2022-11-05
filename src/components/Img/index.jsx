import { httpToHttps } from "@/utils/util"
import React, { memo } from "react"

/**
 *
 * @param {string} src 图片地址
 * @returns
 */

const Img = (props) => {
  let { src, size, ...other } = props
  size = size ? `?param=${size}` : ""
  src = httpToHttps(src)
  if (src) {
    src += size
  }
  return <img src={src} {...other} />
}

export default memo(Img)
