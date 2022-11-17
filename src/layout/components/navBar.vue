<template>
  <div class="navbar">
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="user.avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item> 你好，{{ user.name }}</el-dropdown-item>
            <el-dropdown-item divided @click="onLogout">
              <span style="display: block"> 退出登录 </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const useStore = useUserStore()
const { logout } = useStore
const { user } = storeToRefs(useStore)

const onLogout = () => {
  logout()
  router.push({ name: 'Login' })
}
</script>

<style scoped>
.navbar {
  position: relative;
  height: 50px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  .hamburger-container {
    float: left;
    height: 100%;
    padding: 0 15px;
    line-height: 46px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgb(0 0 0 / 2.5%);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      height: 100%;
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgb(0 0 0 / 2.5%);
        }
      }
    }
    .avatar-container {
      .avatar-wrapper {
        position: relative;
        margin-top: 5px;
        margin-right: 16px;
        margin-left: 16px;
        .user-avatar {
          width: 40px;
          height: 40px;
          cursor: pointer;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          top: 25px;
          right: -20px;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
}
:deep .el-dropdown-menu__item--divided {
  margin: 4px 0;
}
</style>
