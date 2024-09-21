import { createApp } from 'vue'
import './style.css'
// import App from './App.vue'
import router from './router/index.ts'
import MainLayoutVue from './MainLayout/MainLayout.vue'

const app = createApp(MainLayoutVue)
app.use(router)

app.mount('#app')
