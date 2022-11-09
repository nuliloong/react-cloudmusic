import { useLocation } from "react-router-dom"
import { searchRoute } from "@/utils/util"
import { rootRouter } from "@/routers/index"
import { useTitle } from "ahooks"
import store from "@/redux"

import AxiosCanceler from "@/api/axiosCanceler"
import { changeLoginShow } from "@/redux/modules/user/action"
import { Navigate } from "react-router-dom"
/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props) => {
  const { pathname } = useLocation()
  // document.title
  const route = searchRoute(pathname, rootRouter)
  // 清除接口
  AxiosCanceler.removeAllPending()

  useTitle(route?.meta?.title || "云音乐")
  // document.title = route?.meta?.title

  // * 判断当前路由是否需要访问权限(不需要权限直接放行)
  if (!route.meta?.requiresAuth) return props.children
  // // * 判断是否有userId
  const userId = store.getState().user.userId
  if (!userId) return <Navigate to="/find/personality" replace />
  // if (!token) return <Navigate to="/login" replace />;
  // // * Dynamic Router(动态路由，根据后端返回的菜单数据生成的一维数组)
  // const dynamicRouter = store.getState().auth.authRouter;
  // // * Static Router(静态路由，必须配置首页地址，否则不能进首页获取菜单、按钮权限等数据)，获取数据的时候会loading，所有配置首页地址也没问题
  // const staticRouter = [HOME_URL, "/403"];
  // const routerList = dynamicRouter.concat(staticRouter);
  // // * 如果访问的地址没有在路由表中重定向到403页面
  // if (routerList.indexOf(pathname) == -1) return <Navigate to="/403" />;
  // * 当前账号有权限返回 Router，正常访问页面
  return props.children
}

export default AuthRouter
