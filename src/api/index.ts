import axios, { type AxiosInstance, type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { useUserStore } from '@/store/modules/user'
import router from '@/router'
import { TOKEN_NAME } from '@/config/config'
import { checkStatus } from './helper/checkStatus'
import { Message } from './helper/message'
import { AxiosCanceler } from './helper/axiosCancel'
import { ResultEnum, ContentTypeEnum } from './httpEnum'
import { toCamelCase, toSnakeCase } from '@/utils/field-style'

const axiosCanceler = new AxiosCanceler()

const config = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间（10s）
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: false
}

const uploadConfig = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间（10s）
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: false,
  headers: {
    'Content-Type': ContentTypeEnum.FORM_DATA
  }
}

class RequestHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config)

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const userStore = useUserStore()
        // * 将当前请求添加到 pending 中
        axiosCanceler.addPending(config)
        const token: string = userStore.token
        if (config.headers) {
          if (token) config.headers[TOKEN_NAME] = token
        }
        config.data = toSnakeCase(config.data)
        config.params = toSnakeCase(config.params)
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const res: AxiosResponse = toCamelCase(response)
        const { data, config } = res
        const userStore = useUserStore()
        // * 在请求结束后，移除本次请求
        axiosCanceler.removePending(config)
        // * 登陆失效（code == invalid_token）
        if (data.code == ResultEnum.OVERDUE) {
          Message.error(data.msg)
          userStore.setToken('')
          router.replace({
            path: '/login'
          })
          return Promise.reject(data)
        }
        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          Message.error(data.msg)
          return Promise.reject(data)
        }
        // * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
        return data
      },
      async (error: AxiosError<any>) => {
        const { response } = error
        // 请求超时单独判断，因为请求超时没有 response
        if (error.message.indexOf('timeout') !== -1) Message.error('请求超时！请您稍后重试')
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) router.replace({ path: '/500' })
        // 根据响应的错误状态码，做不同的处理 (后端返回数据时，交由页面处理报错)
        if (response && !(response && response.data)) {
          checkStatus(response.status)
          return Promise.reject(error)
        } else {
          Message.error(response && response.data && response.data.message)
          // 接口登录异常，清空用户信息并跳转到login页
          if (response && response.data && (response.data.code === 'unauthorized' || response.data.code === 'token_invalid')) {
            const { logout } = useUserStore()
            logout()
            router.push({ name: 'Login' })
          }
          return Promise.reject(response && response.data)
        }
      }
    )
  }

  // * 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.get(url, { params, ..._object })
  }
  post<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.post(url, params, _object)
  }
  put<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.put(url, params, _object)
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<T> {
    return this.service.delete(url, { params, ..._object })
  }
}

export default new RequestHttp(config)
export const uploadApi = new RequestHttp(uploadConfig)
