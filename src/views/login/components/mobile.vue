<template>
  <div class="mobile">
    <el-form ref="FormRef" :model="form" :rules="rules" label-position="top">
      <el-form-item prop="mobile" label="手机号">
        <el-input v-model="form.mobile" autocomplete="off" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="smsCode" label="验证码">
        <el-row :gutter="8">
          <el-col :span="14">
            <el-input
              v-model="form.smsCode"
              type="text"
              maxlength="6"
              placeholder="请输入短信验证码"
              clearable
              autocomplete="off"
            >
              <template #prefix>
                <el-icon><i-ep-message /></el-icon>
              </template>
            </el-input>
          </el-col>
          <el-col :span="10">
            <sms-button :style="{ height: '100%' }" @send="getSmsCode" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <div class="links">
          <el-button class="forget-password" type="primary" link size="small">忘记密码？</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="loading" class="login" type="primary" @click="submitForm(FormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import SmsButton from '@/components/common/SmsButton.vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import { getSmsCodeApi } from '@/api/modules/login'

const router = useRouter()
const FormRef = ref<FormInstance>()
const regMobile = /^(?:86)?[1]([3-9])[0-9]{9}$/
const userStore = useUserStore()
const { login } = userStore

const loading = ref<boolean>(false)
const form = reactive({
  mobile: '',
  smsCode: ''
})
const validateMobile = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('手机号不能为空'))
  } else if (!regMobile.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}
const validateSmsCode = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入短信验证码'))
  } else {
    if (form.mobile) {
      if (!FormRef.value) return
      FormRef.value.validateField('mobile', () => null)
    }
    callback()
  }
}
const rules = reactive<FormRules>({
  mobile: [{ validator: validateMobile, trigger: 'blur' }],
  smsCode: [{ validator: validateSmsCode, trigger: 'blur' }]
})

const getSmsCode = (start: any, finish: any) => {
  if (!FormRef.value) return
  FormRef.value.validateField('mobile', async valid => {
    if (valid) {
      try {
        await getSmsCodeApi(form.mobile)
        start()
        ElMessage({
          message: '发送验证码成功！',
          grouping: true,
          type: 'success'
        })
      } catch {
        finish()
      }
    }
  })
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  loading.value = true
  await formEl.validate(async valid => {
    if (valid) {
      try {
        await login({ mobile: form.mobile, smsCode: form.smsCode, role: 'enterprise_user', label: '专家小助手' })
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
.mobile {
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
