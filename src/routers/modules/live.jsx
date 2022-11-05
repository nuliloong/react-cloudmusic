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
			title: "直播"
		},
		children: [
			{
				path: "/live",
				element: lazyLoad(React.lazy(() => import("@v/content/live"))),
				meta: {
					requiresAuth: false,
					title: "直播"
				}
			}
		]
	}
];

export default routers;
