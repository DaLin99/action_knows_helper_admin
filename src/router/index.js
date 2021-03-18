import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  {
    path: "/staff-manage",
    name: "staff-manage",
    component: Layout,
    children: [
      {
        path: "list",
        name: "staffManage",
        component: () => import("@/views/staff/list"),
        meta: { title: "人员管理", icon: "table" }
      }
    ]
  },
  {
    path: "/lost-found",
    name: "lost-found",
    component: Layout,
    children: [
      {
        path: "list",
        name: "lostAndFound",
        component: () => import("@/views/lostAndFound"),
        meta: { title: "失物招领", icon: "form" }
      }
    ]
  },
  {
    path: "/recruit",
    component: Layout,
    children: [
      {
        path: "list",
        name: "recruit",
        component: () => import("@/views/recruit/list"),
        meta: { title: "招聘信息", icon: "dashboard" }
      }
    ]
  },
  {
    path: "/activity",
    component: Layout,
    children: [
      {
        path: "list",
        name: "activity",
        component: () => import("@/views/activity/list"),
        meta: { title: "学院活动", icon: "link" }
      }
    ]
  },
  {
    path: "/forum",
    component: Layout,
    children: [
      {
        path: "list",
        name: "forum",
        component: () => import("@/views/forum/list"),
        meta: { title: "学院论坛", icon: "el-icon-s-help" }
      }
    ]
  }
  // 404 page must be placed at the end !!!
  // { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
