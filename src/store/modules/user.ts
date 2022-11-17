import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import type { User } from '@/api/interface/user'
import type { Login } from '@/api/interface/login'
import { loginApi } from '@/api/modules/login'
import { getCurrentUser } from '@/api/modules/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const user: Partial<User.ResUser> = reactive({})
    const token = ref('')

    const userRoles = computed(() => {
      let roles = []
      if (user.role === 'admin') {
        roles.push('Admin')
      }
      return roles
    })

    function setToken(val: string) {
      token.value = val
    }

    function setUserInfo(data: Partial<User.ResUser>) {
      Object.assign(user, data)
    }

    function login(user: Login.ReqLoginForm) {
      return new Promise((resolve, reject) => {
        loginApi(user)
          .then(({ token }) => {
            setToken(token)
            resolve(true)
          })
          .catch(error => {
            reject(error)
          })
      })
    }

    function getUserInfo() {
      return new Promise((resolve, reject) => {
        getCurrentUser()
          .then(({ user }) => {
            setUserInfo(user)
            resolve(user)
          })
          .catch(error => {
            reject(error)
          })
      })
    }

    function logout() {
      return new Promise(resolve => {
        setToken('')
        localStorage.removeItem('userData')
        resolve(true)
      })
    }

    return { user, token, setToken, userRoles, login, getUserInfo, setUserInfo, logout }
  },
  {
    persist: piniaPersistConfig('userData')
  }
)
