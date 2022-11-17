import 'vue-router'
/**
 * 路由meta定义
 */
declare module 'vue-router' {
  interface RouteMeta {
    roles?: Array<string>
    whiteList?: Boolean
    title?: String
    noCache?: Boolean
    icon?: String
  }
}
