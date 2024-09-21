import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store/store.js'

// createApp(App).mount('#app')

const app = createApp(App);
app.use(store)



app.mount('#app')