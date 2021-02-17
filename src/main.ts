import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/lib/theme-chalk/index.css';
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import axios, { AxiosStatic } from 'axios'

let app = createApp(App)
app.use(ElementPlus);
app.use(VueAxios, axios);
app.mount('#app')