/**
 *  全局注册组件
 */
import type { App } from 'vue'
import SvgIcon from '@/components/common/SvgIcon.vue'

export default function loadComponent(app: App<Element>) {
  app.component('SvgIcon', SvgIcon)
}
