import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import Layout from "@v/layout";
import { Navigate } from "react-router-dom";

// 外部链接模块
const routers = [
  // {
  //   path: "/dj",
  //   element: <Navigate to="/dj" /> // 默认一级路由
  // },
	{
		element: <Layout />,
		meta: {
			title: "详情"
		},
		children: [
			{
				path: "/songlistdetail/:id",
				element: lazyLoad(React.lazy(() => import("@v/content/detail/songlist_detail"))),
				meta: {
					requiresAuth: false,
					title: "歌单详情"
				}
			},
			{
				path: "/albumdetail/:id",
				element: lazyLoad(React.lazy(() => import("@v/content/detail/album_detail"))),
				meta: {
					requiresAuth: false,
					title: "专辑详情"
				}
			}
		]
	}
];

export default routers;
