import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import loadComponent from './plugins'

// 路由权限控制
import './permission'
// 全局 css
import '@/styles/index.css'

const app = createApp(App)

// 注册所有组件
loadComponent(app)

app.use(store).use(router).mount('#app')
