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
			title: "播客"
		},
		children: [
			{
				path: "/songlistdetail/:id",
				element: lazyLoad(React.lazy(() => import("@v/content/find/songlist_detail"))),
				meta: {
					requiresAuth: false,
					title: "发现音乐-歌单详情"
				}
			}
		]
	}
];

export default routers;
