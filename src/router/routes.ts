import { type RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

/**
 * 基础路由 | 404 重定向 登录注册
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: {
      title: '登录页',
      whiteList: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '找不到页面',
      whiteList: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: markRaw(Layout),
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/index.vue'),
        meta: {
          title: '个人面板'
        }
      }
    ]
  }
]
/**
 * 动态路由：需登录判断权限，例管理员页
 */
export const asyncRouters: RouteRecordRaw[] = []
/**
 * 通配符error路由
 */
export const errorRouters: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)',
    name: '*',
    meta: { title: '', hidden: true },
    redirect: '/404'
  }
]
