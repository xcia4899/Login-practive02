

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'

// import 'element-plus/dist/index.css'
import './assets/styles/main.scss'  // 在這引入
import "./assets/tailwind.css";
import 'element-plus/theme-chalk/src/index.scss'

const app = createApp(App)
app.use(ElementPlus)

app.use(createPinia())
app.use(router)

app.mount('#app')
