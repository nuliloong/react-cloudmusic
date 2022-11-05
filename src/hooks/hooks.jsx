import { throttle } from "@/utils/util"
import { useRef } from "react"
import { useCallback, useEffect } from "react"
import { useLocation } from "react-router-dom"

// 创建插槽
export const useSlot = (props) => {
  return (slotName) => {
    let children = props.children
    if (typeof children === "object" && !Array.isArray(children)) children = [children]
    if (children)
      for (let el of children) {
        if (el.props.slot === slotName) return el
      }
    return null
  }
}

export const dragRight = (resizeLine, setSiderWidth) => {
  useEffect(() => {
    let { current } = resizeLine
    let mouseDown = (downE) => {
      document.body.style.cursor = "ew-resize"
      let resize = throttle((moveE) => {
        let clientX = moveE.clientX

        if (clientX < 200) {
          clientX = 200
        }
        const content = document.querySelector(".layout-container")
        let width = content.offsetWidth - clientX
        if (width < 800) {
          clientX = content.offsetWidth - 800
        }
        setSiderWidth(clientX)
      }, 50)

      let resizeUp = () => {
        document.body.style.cursor = "default"
        document.removeEventListener("mousemove", resize)
        document.removeEventListener("mouseup", resizeUp)
      }

      document.addEventListener("mousemove", resize)
      document.addEventListener("mouseup", resizeUp)
    }

    current.addEventListener("mousedown", mouseDown)

    return () => {
      current.removeEventListener("mousedown", mouseDown)
    }
  }, [])
}

export function useRefCallback(fn, dependencies) {
  const ref = useRef(fn)

  // 每次调用的时候，fn 都是一个全新的函数，函数中的变量有自己的作用域
  // 当依赖改变的时候，传入的 fn 中的依赖值也会更新，这时更新 ref 的指向为新传入的 fn
  useEffect(() => {
    ref.current = fn
  }, [fn, ...dependencies])

  return useCallback(() => {
    const fn = ref.current
    return fn()
  }, [ref])
}

export function useLazyImg(dom) {
  const { pathname } = useLocation()
  const isInClient = (item) => {
    let { top, bottom } = item.getBoundingClientRect()
    let bodyHeight = document.body.offsetHeight
    if ((top >= 0 && top < bodyHeight + bodyHeight / 2) || (bottom >= 0 && bottom < bodyHeight + bodyHeight / 2)) {
      return true
    } else {
      return false
    }
  }
  const checkImages = (e) => {
    let imgs = document.querySelectorAll("img")
    imgs.forEach(item => {
      if (isInClient(item) && item.src === "") {
        if (item.getAttribute("src")) {
          item.src = item.getAttribute("src")
        }
      }
    })
  }
  useEffect(() => {
    const _target = dom.current
    setTimeout(() => {
      checkImages()
    }, 1)
    _target.addEventListener("scroll", checkImages)
    return () => {
      _target.removeEventListener("scroll", checkImages)
    }
  }, [pathname])
}



