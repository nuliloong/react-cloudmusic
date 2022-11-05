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
			title: "私人FM"
		},
		children: [
			{
				path: "/private_fm",
				element: lazyLoad(React.lazy(() => import("@v/content/private_fm"))),
				meta: {
					requiresAuth: false,
					title: "私人FM"
				}
			}
		]
	}
];

export default routers;
