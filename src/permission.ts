import { useTitle } from '@vueuse/core'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import 'nprogress/nprogress.css'
import router, { errorRouters } from '@/router'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { RouteRecordRaw } from 'vue-router'

const { start, done } = useNProgress(null, {
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: true, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})
/**
 *
 * 路由添加及权限判断步骤
 * * 区分是否需要登录 meta 添加字段whiteList 如果是true，则无需登录
 * * 判断是否含有token，有token时取用户信息
 * * 添加动态路由(角色控制及配置控制：需登录后判断角色) 逻辑详见store/modules/permission.ts
 *
 */
router.beforeEach(async (to, _, next) => {
  start()

  const pageTitle = useTitle()
  pageTitle.value = `${to.meta?.title || ''} ${import.meta.env.VITE_APP_TITLE}`

  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  const { getUserInfo } = userStore
  const { generateRoutes } = permissionStore

  // 有token时 无路由时跳404页
  // 无token时 无路由时跳login页
  if (userStore.token) {
    if (to.path === '/login') {
      // 有token，重定向到主页
      next({ path: '/' })
      done()
    } else {
      // 获取用户信息 可先判断store，避免多次取user
      await getUserInfo()

      // 处理权限
      const authModules = userStore.appPerms

      await generateRoutes(authModules, userStore.user.systemRole!, appStore.app.settings.sysSetting!)

      // 添加路由
      permissionStore.addRoutes.map((addRoute: RouteRecordRaw) => {
        if (!(addRoute.name && router.hasRoute(addRoute.name))) {
          if (Array.isArray(addRoute.beforeEnter)) {
            router.addRoute({ ...addRoute })
          } else {
            router.addRoute({
              ...addRoute
            })
          }
          // 如果是当前路由，跳转
          if (to.path.match(addRoute.path)) {
            next({ ...to, replace: true })
          }
        }
      })

      //删除路由 removeRoute
      permissionStore.removeRoutes.map((removeRoute: RouteRecordRaw) => {
        if (removeRoute.name && router.hasRoute(removeRoute.name)) {
          router.removeRoute(removeRoute.name)
        }
      })

      // 添加通配符error路由
      errorRouters.map(errorRouter => {
        if (!(errorRouter.name && router.hasRoute(errorRouter.name))) {
          router.addRoute(errorRouter)
          // 判断当前路由是否有路由，没有手动跳转到404
          if (!(to.name && router.hasRoute(to.name))) {
            next('/404')
            done()
            return
          }
        }
      })

      // 动态删除路由后判断是否存在
      if (to.name && !router.hasRoute(to.name)) {
        next('/404')
        done()
        return
      }

      next()
    }
  } else {
    if (to.meta && to.meta.whiteList) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      done()
    }
  }
})

router.afterEach(() => {
  done()
})
