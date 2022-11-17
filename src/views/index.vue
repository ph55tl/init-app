<template>
  <div class="page-wrapper">
    <p class="logo-title">首页</p>
    <div v-for="(permission, pIndex) in Object.values(permissionAssignments)" :key="pIndex">
      <el-card>
        <p>{{ permission.title }}</p>
        <div v-for="(routes, rIndex) in permission.children" :key="rIndex">
          <div v-for="route in routes.children" :key="route.route">
            <router-link :to="{ name: route.route }">
              {{ route.title }}
            </router-link>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const permissionStore = usePermissionStore()
const { permissionAssignments } = storeToRefs(permissionStore)

appStore.setSettings({
  theme: '#409EFF'
})
</script>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo-title {
    font-size: 2em;
  }
}
</style>
