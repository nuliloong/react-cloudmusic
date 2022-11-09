import React from "react"
import lazyLoad from "@/routers/utils/lazyLoad"
import Layout from "@v/layout"
import FindLayout from "@v/content/find"
import Personality from "@/view/content/find/personality"
import FindNew_song from "@/view/content/find/new_song/new_music"
import { Navigate } from "react-router-dom"

// 外部链接模块
const routers = [
  {
    element: <Layout />,
    meta: {
      requiresAuth: false,
      title: "发现音乐",
    },
    children: [
      {
        path: "/find/songlistdetail",
        element: lazyLoad(React.lazy(() => import("@v/content/find/songlist_detail"))),
        meta: {
          requiresAuth: false,
          title: "发现音乐-歌单详情",
        },
      },
      {
        path: "/find/albumdetail",
        element: lazyLoad(React.lazy(() => import("@v/content/find/album_detail"))),
        meta: {
          requiresAuth: false,
          title: "发现音乐-专辑详情",
        },
      },
      {
        path: "/find/daily_recommended",
        element: lazyLoad(React.lazy(() => import("@v/content/find/daily_recommended"))),
        meta: {
          requiresAuth: true,
          title: "每日推荐",
        },
      },
      {
        path: "/find",
        element: <FindLayout />,
        meta: {
          requiresAuth: false,
          title: "发现音乐",
        },
        children: [
          { path: "/find", element: <Navigate to="/find/personality" /> }, // 默认一级路由
          {
            path: "/find/personality",
            element: <Personality />,
            meta: {
              requiresAuth: false,
              title: "发现音乐-个性推荐",
            },
          },
          {
            path: "/find/custom",
            element: lazyLoad(React.lazy(() => import("@/view/content/find/custom"))),
            meta: {
              requiresAuth: false,
              title: "发现音乐-专属定制",
            },
          },
          {
            path: "/find/song_list",
            element: lazyLoad(React.lazy(() => import("@/view/content/find/song_list"))),
            meta: {
              requiresAuth: false,
              title: "发现音乐-歌单",
            },
          },
          {
            path: "/find/leaderboard",
            element: lazyLoad(React.lazy(() => import("@/view/content/find/leaderboard"))),
            meta: {
              requiresAuth: false,
              title: "发现音乐-排行榜",
            },
          },
          {
            path: "/find/singer",
            element: lazyLoad(React.lazy(() => import("@/view/content/find/singer"))),
            meta: {
              requiresAuth: false,
              title: "发现音乐-歌手",
            },
          },
          {
            path: "/find/new_song",
            element: lazyLoad(React.lazy(() => import("@/view/content/find/new_song"))),
            children: [
              { path: "/find/new_song", element: <Navigate to="/find/new_song/top_music" /> }, // 默认一级路由
              {
                path: "/find/new_song/top_music",
                element: <FindNew_song />,
                meta: {
                  requiresAuth: false,
                  title: "发现音乐-最新音乐",
                },
              },
              {
                path: "/find/new_song/top_album",
                element: lazyLoad(
                  React.lazy(() => import("@/view/content/find/new_song/new_album"))
                ),
                meta: {
                  requiresAuth: false,
                  title: "发现音乐-最新音乐",
                },
              },
            ],
          },
        ],
      },
    ],
  },
]

export default routers
