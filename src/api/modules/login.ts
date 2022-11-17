import type { Result } from '@/api/interface/common'
import type { Login } from '@/api/interface/login'
import http from '@/api'

/**
 * 登录
 * @param params
 * @returns
 */
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>(`/logins`, params)
}

/**
 * 获取验证码
 * @param mobile
 * @returns
 */
export const getSmsCodeApi = (mobile: string) => {
  return http.post<Result>(`/sms_codes`, { mobile: mobile })
}
