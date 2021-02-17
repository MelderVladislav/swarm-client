import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/lib/theme-chalk/index.css';
import ElementPlus from 'element-plus'

let app = createApp(App)

app.use(ElementPlus);

app.mount('#app')
