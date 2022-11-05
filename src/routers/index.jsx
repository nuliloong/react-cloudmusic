import { Navigate, useRoutes } from "react-router-dom";
// import { RouteObject } from "@/routers/interface";
import Layout from "@v/layout";
import NotFound from "./404";

// * 导入所有router
const metaRouters = import.meta.globEager("./modules/*.jsx");


// * 处理路由
export const routerArray = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

export const rootRouter = [
  {
    path: "/",
    element: <Navigate to="/find/personality" /> // 默认一级路由
  },
	...routerArray,
  {
    path: "*",
    element: <NotFound />
    // element: <Navigate to="/404" />
  }
];

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
