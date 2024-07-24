import './assets/main.css'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import AntModal from "@/components/antUi/antModal.vue";


 import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import { Dialog } from 'vant';
import { DatePicker } from 'vant';
import { RollingText } from 'vant';
import { CountDown } from 'vant';


const app = createApp(App)
app.use(DatePicker)
app.use(CountDown)
app.use(RollingText)
app.use(Dialog)
app.use(Antd)
app.use(AntModal)

app.use(router)
app.use(VueQueryPlugin)
app.use(store)


app.mount('#app')

