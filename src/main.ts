import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/lib/theme-chalk/index.css';
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import axios, { AxiosStatic } from 'axios'
import router from './router'

let app = createApp(App)
app.use(ElementPlus);
app.use(VueAxios, axios).use(router)
app.mount('#app')