import axios, { AxiosStatic } from 'axios'
import { createApp } from 'vue'
import VueAxios from 'vue-axios'
import './index.css';
import 'element-plus/lib/theme-chalk/index.css';
import ElementPlus from 'element-plus'
import App from './App.vue'

let app = createApp(App)
app.use(ElementPlus);
app.use(VueAxios, axios);
app.mount('#app')