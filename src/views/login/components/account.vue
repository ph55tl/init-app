<template>
  <div class="account">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-position="top">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="form.username" autocomplete="off" placeholder="账号名/手机号/邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="form.password" type="password" autocomplete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="links">
          <el-button class="forget-password" type="primary" link size="small">忘记密码？</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="loading" class="login" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const userStore = useUserStore()
const { login } = userStore
const ruleFormRef = ref<FormInstance>()

const loading = ref<boolean>(false)
const form = reactive({
  username: '',
  password: ''
})
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入账号/手机号/邮箱'))
  } else {
    callback()
  }
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}
const rules = reactive<FormRules>({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  loading.value = true
  await formEl.validate(async valid => {
    if (valid) {
      try {
        await login({ mobile: form.username, password: form.password, role: 'enterprise_user', label: '专家小助手' })
        router.push({ path: (router.currentRoute.value.query.redirect as string) || '/' })
      } finally {
        loading.value = false
      }
    } else {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.account {
  width: 100%;
  .login {
    width: 100%;
    height: 50px;
    margin: 20px 0 0;
    background: linear-gradient(90deg, #00b2c3 0%, #006cb7 100%);
    border-radius: 2px;
  }
  .links {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    .forget-password {
      font-family: PingFangSC-Regular, 'PingFang SC';
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      color: #edf2fc;
    }
  }
}
:deep {
  .el-form-item__label {
    font-family: PingFangSC-Regular, 'PingFang SC';
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    color: #edf2fc;
  }
  .el-input__wrapper {
    background: #26272a;
    border: 1px solid #363738;
    border-radius: 2px;
    box-shadow: none;
  }
  .el-input__wrapper.is-focus {
    border: 1px solid #1076ff;
  }
}
</style>
