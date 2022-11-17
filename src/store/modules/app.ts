import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import { AppData } from '../interface/app'

export const useAppStore = defineStore(
  'app',
  () => {
    const settings: AppData.Setting = {
      theme: '',
      title: '',
      sidebar: {
        opened: true
      }
    }
    const app = reactive({ settings })

    function setSettings(data: AppData.Setting) {
      Object.assign(app.settings, data)
    }

    function toggleSidebar() {
      app.settings.sidebar = {
        opened: !(app.settings.sidebar && app.settings.sidebar.opened)
      }
    }

    return { app, setSettings, toggleSidebar }
  },
  {
    persist: piniaPersistConfig('appData')
  }
)
