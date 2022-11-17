<template>
  <div>
    <Navbar></Navbar>
    <keep-alive>
      <router-view v-if="currentRoute.meta.keepAlive" :key="currentRoute.path"></router-view>
    </keep-alive>
    <router-view v-if="!currentRoute.meta.keepAlive" :key="currentRoute.path"></router-view>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import { useRoute } from 'vue-router'

const currentRoute = useRoute()
</script>
