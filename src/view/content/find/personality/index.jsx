import React, { Suspense, useState } from 'react'
import { Spin } from "antd";

import FindCollapse from '@/components/FindCollapse'
import BannerSwiper from './components/swiper'
import lazyLoad from '@/routers/utils/lazyLoad'
import './index.less';
import { useNavigate } from 'react-router-dom';

export default function Personality() {
  const navigateTo = useNavigate()

  const pathTo = (path) => {
    if (!path) return
    if (new RegExp("^\/").test(path)) {
      navigateTo(path)
      return
    }
    window.open(path)
  }

  const [menuList, setMenuList] = useState([
    { title: '推荐歌单', path: '/find/song_list', element: lazyLoad(React.lazy(() => import("./components/recommend"))) },
    { title: '热门播客', path: '/dj', element: lazyLoad(React.lazy(() => import("./components/dj"))) },
    { title: '最新音乐', path: '/find/new_song', element: lazyLoad(React.lazy(() => import("./components/new_music"))) },
    { title: '推荐MV', path: '/video', element: lazyLoad(React.lazy(() => import("./components/personalized_mv"))) },
    { title: '听听', path: 'https://look.163.com/hot', element: '' },
    { title: '看看', path: 'https://look.163.com/hot', element: '' },
    // { title: '独家放送', path: '', element: <div>独家放送</div> },
  ])

  return (
    <div className='personality'>
      <BannerSwiper />
      {
        menuList.map(item => (
          <FindCollapse title={item.title} key={item.title} onClick={() => pathTo(item.path)}>
            {item.element}
          </FindCollapse >
        ))
      }
    </div >
  )
}
