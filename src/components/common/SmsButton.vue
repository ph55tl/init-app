<template>
  <el-button :disabled="state.start" :class="state.start ? 'captcha-time' : 'captcha-button'" @click="sendSmsCode">
    {{ (!state.start && '获取验证码') || state.time + '秒后重新获取' }}
  </el-button>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const emit = defineEmits(['send'])

const state = reactive<{ time: number; start: boolean }>({
  time: 60,
  start: false
})

const sendSmsCode = () => {
  const interval = window.setInterval(() => {
    if (state.time-- <= 0) {
      state.time = 60
      state.start = false
      window.clearInterval(interval)
    }
  }, 1000)
  emit(
    'send',
    () => {
      state.start = true
    },
    () => {
      clearInterval(interval)
      state.time = 60
      state.start = false
    }
  )
}
</script>
<style scoped>
.captcha {
  &-time {
    text-decoration: none;
  }
}
</style>
