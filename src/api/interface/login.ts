// * 登录模块
export namespace Login {
  type CodeForm = {
    mobile: string
    smsCode: string
    role: string | string[]
    label: string
  }
  type PasswordForm = {
    password: string
    role: string | string[]
    label: string
  } & ({ email: string } | { mobile: string })

  export type ReqLoginForm = CodeForm | PasswordForm

  export type ResLogin = {
    token: string
  }
}
