import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes, asyncRouters, errorRouters } from './routes'

export { constantRoutes, asyncRouters, errorRouters }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...constantRoutes],
  strict: true,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0 }
    }
  }
})

export default router
