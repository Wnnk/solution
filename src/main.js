import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/style/css/iconfont.css'
import { permission } from './directive/permission'
import { status } from './directive/status'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.directive('permission', permission)
app.directive('status', status)

app.mount('#app')
