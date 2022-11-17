import { defineStore } from 'pinia'
import { asyncRouters } from '@/router'
import { type RouteRecordRaw } from 'vue-router'
import permission from '@/config/permission'
import { isEmpty, flattenDeep } from 'lodash-es'

type PermissionType = {
  title: string
  children: Array<{
    role: string
    children: Array<{
      title: string
      route: string
    }>
  }>
}

/**
 * 根据authModules 返回 拥有的PermissionAssignments配置数据
 * @param permission
 * @param authModules
 */
function filterPermissionAssignmentsByAuthModules(
  permission: { [x: string]: PermissionType },
  authModules: { [x: string]: Array<string> }
) {
  if (!isEmpty(authModules) && !isEmpty(permission)) {
    const res: { [x: string]: PermissionType } = {}
    Object.keys(authModules).map(key => {
      const data: PermissionType = {
        title: permission[key].title,
        children: []
      }
      permission[key].children.map(item => {
        if (authModules[key].some(module => module === item.role)) {
          data.children.push(item)
        }
      })
      if (!isEmpty(data.children)) {
        res[key] = data
      }
    })
    return res
  } else {
    return {}
  }
}
/**
 * 根据PermissionAssignments 返回 routes数据
 * @param routes
 * @param PermissionAssignments
 */
function filterAsyncRoutesByPermissionAssignments(
  routes: RouteRecordRaw[],
  PermissionAssignments: { [x: string]: PermissionType }
) {
  if (!isEmpty(routes) && !isEmpty(PermissionAssignments)) {
    const res: RouteRecordRaw[] = []
    const names: Array<string> = flattenDeep(
      Object.values(PermissionAssignments).map(item => {
        return item.children.map(item2 => item2.children.map(item3 => item3.route))
      })
    )
    res.push(...routes.filter(route => names.includes(route.name as string)))
    return res
  } else {
    return []
  }
}

export const usePermissionStore = defineStore('permission', () => {
  const permissionAssignments = ref({} as { [x: string]: PermissionType })
  const addRoutes = ref([] as RouteRecordRaw[])

  function setPermissionAssignments(val: { [x: string]: PermissionType }) {
    permissionAssignments.value = val
  }

  function setAddRoutes(val: RouteRecordRaw[]) {
    addRoutes.value = val
  }

  /**
   *
   * 根据模块配置返回可注册路由
   *
   * @param authModules
   * @returns
   */
  function generateRoutes(authModules: { [x: string]: Array<string> }) {
    return new Promise(resolve => {
      const permissionAssignments = filterPermissionAssignmentsByAuthModules(permission, authModules)
      const hasRoutes = filterAsyncRoutesByPermissionAssignments(asyncRouters, permissionAssignments)
      setPermissionAssignments(permissionAssignments)
      setAddRoutes(hasRoutes)
      resolve(hasRoutes)
    })
  }

  return { permissionAssignments, addRoutes, setPermissionAssignments, setAddRoutes, generateRoutes }
})
