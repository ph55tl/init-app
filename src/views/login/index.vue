<template>
  <div class="login">
    <div class="logo-container">
      <img src="@/assets/login/logo.png" />
    </div>
    <div class="form-container">
      <div class="from">
        <h4 class="title">{{ title }}</h4>
        <el-tabs v-model="tabsActiveName" stretch>
          <el-tab-pane label="验证码登录" name="smsCode" :disabled="tabsActiveName === 'smsCode'">
            <Mobile />
          </el-tab-pane>
          <el-tab-pane label="密码登录" name="password" :disabled="tabsActiveName === 'password'">
            <Account />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Account from './components/account.vue'
import Mobile from './components/mobile.vue'

const tabsActiveName = ref('password')
const title = import.meta.env.VITE_APP_TITLE
</script>

<style scoped>
.login {
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: 100px 50px;
  overflow-y: auto;
  background: url('@/assets/login/bg.png') center no-repeat;
  background-size: cover;
  .logo-container {
    position: absolute;
    top: 60px;
    left: 70px;
  }
  .form-container {
    width: 480px;
    height: 640px;
    overflow: hidden;
    background: rgb(30 30 33 / 70%);
    border: 1px solid;
    border-radius: 5px;
    border-image: linear-gradient(98deg, rgb(0 178 195 / 100%), rgb(3 60 98 / 100%)) 1 1;
    .from {
      width: 100%;
      padding: 80px 55px;
      .title {
        margin: 0 0 30px;
        font-size: 30px;
        font-weight: 500;
        line-height: 38px;
        color: #edf2fc;
        text-align: center;
      }
    }
  }
  .form-container::-webkit-scrollbar {
    display: none;
  }
}
:deep {
  .el-tabs__item {
    padding: 0;
    margin: 0 30px;
    color: #edf2fc;
  }
  .el-tabs__item.is-active {
    color: #1076ff;
  }
  .el-tabs__nav-wrap::after {
    background: #363738;
  }
}
</style>
