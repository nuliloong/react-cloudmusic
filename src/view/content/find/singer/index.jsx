import { getArtist } from "@/api/modules/find"
import ImgBox from "@/components/ImgBox"
import TagBar from "@/components/TagsBar"
import { throttle, to } from "@/utils/util"
import { Spin } from "antd"
import React from "react"
import "./index.less"

export default class Singer extends React.Component {
  state = {
    /* 分类标签 */
    areaTags: {
      category: "语种",
      list: [
        { area: "-1", name: "全部" },
        { area: "7", name: "华语" },
        { area: "96", name: "欧美" },
        { area: "8", name: "日本" },
        { area: "16", name: "韩国" },
        { area: "0", name: "其它" },
      ],
    },
    typeTags: {
      category: "分类",
      list: [
        { type: "-1", name: "全部" },
        { type: "1", name: "男歌手" },
        { type: "2", name: "女歌手" },
        { type: "3", name: "乐队" },
      ],
    },
    initialTags: {
      category: "筛选",
      list: [
        { initial: "-1", name: "热门" },
        { initial: "a", name: "A" },
        { initial: "b", name: "B" },
        { initial: "c", name: "C" },
        { initial: "d", name: "D" },
        { initial: "e", name: "E" },
        { initial: "f", name: "F" },
        { initial: "g", name: "G" },
        { initial: "h", name: "H" },
        { initial: "i", name: "I" },
        { initial: "j", name: "J" },
        { initial: "k", name: "K" },
        { initial: "l", name: "L" },
        { initial: "m", name: "M" },
        { initial: "n", name: "N" },
        { initial: "o", name: "O" },
        { initial: "p", name: "P" },
        { initial: "q", name: "Q" },
        { initial: "r", name: "R" },
        { initial: "s", name: "S" },
        { initial: "t", name: "T" },
        { initial: "u", name: "U" },
        { initial: "v", name: "V" },
        { initial: "w", name: "W" },
        { initial: "x", name: "X" },
        { initial: "y", name: "Y" },
        { initial: "z", name: "Z" },
        { initial: "0", name: "#" },
      ],
    },
    area: "-1",
    type: "-1",
    initial: "-1",
    artistList: [],
    pageIndex: 1,
    isMore: true,
    isScrollLock: false,
    isTypeLoading: false,
  }

  // // 获取歌手名单
  getArtistList = async (init) => {
    const { pageIndex, area, type, initial, artistList } = this.state
    const [err, res] = await to(
      getArtist({ area, type, initial, limit: 50, offset: (pageIndex - 1) * 50 })
    )
    if (res) {
      const _list = res?.artists || []
      this.setState({
        artistList: init ? _list : [...artistList, ..._list],
        pageIndex: pageIndex + 1,
        isMore: !!res.more,
      })
    }
    this.setState({ isScrollLock: false, isTypeLoading: false })
  }
  // 修改分类触发
  changeCategory = (key) => (value) => {
    this.setState(
      {
        [key]: value,
        artistList: [],
        pageIndex: 1,
        isMore: true,
        isScrollLock: false,
        isTypeLoading: true,
      },
      () => {
        this.getArtistList(true)
      }
    )
  }
  // 滚动事件
  scrollChange = throttle((e) => {
    if (this.state.isScrollLock) return
    const target = e.target
    // const offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight
    if (Math.ceil(target.scrollTop) + Math.ceil(target.offsetHeight) + 200 >= target.scrollHeight) {
      if (this.state.isMore) {
        this.setState({ isScrollLock: true })
        this.getArtistList()
      }
    }
  }, 500)
  scrollbox = document.querySelector(".find-content")
  // 组件完成加载
  componentDidMount() {
    // 监听滚动条事件
    this.scrollbox.addEventListener("scroll", this.scrollChange)
    this.setState({ isTypeLoading: true })
    // 初始化页面数据
    this.getArtistList()
  }
  // 组件将要卸载
  componentWillUnmount() {
    // 清除监听事件
    this.scrollbox.removeEventListener("scroll", this.scrollChange)
  }

  render() {
    const {
      areaTags,
      typeTags,
      initialTags,
      area,
      type,
      initial,
      artistList,
      isMore,
      isScrollLock,
      isTypeLoading,
    } = this.state
    return (
      <div className="leaderboard">
        {/* 分类筛选 */}
        <Spin spinning={isTypeLoading}>
          <TagBar
            tagList={areaTags}
            valuekey="area"
            onChange={this.changeCategory("area")}
            value={area}
          />
          <TagBar
            tagList={typeTags}
            valuekey="type"
            onChange={this.changeCategory("type")}
            value={type}
          />
          <TagBar
            tagList={initialTags}
            valuekey="initial"
            onChange={this.changeCategory("initial")}
            value={initial}
          />
          {/* 歌手数据 */}
          <div className="leaderboard-list">
            {artistList.map((item) => (
              <div key={item.id} className="leaderboard-list-item">
                <ImgBox
                  loading="lazy"
                  size="220y220"
                  src={item.picUrl}
                  className="img-box"
                  width="100%"
                />
                <div className="item-user">
                  <span className="item-user-name">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="more">{isScrollLock ? <Spin /> : ""}</div>
          <div className="more">{isMore ? "" : "~没有更多了~"}</div>
        </Spin>
      </div>
    )
  }
}
