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
			title: "关注"
		},
		children: [
			{
				path: "/follow",
				element: lazyLoad(React.lazy(() => import("@v/content/follow"))),
				meta: {
					requiresAuth: false,
					title: "关注"
				}
			}
		]
	}
];

export default routers;
