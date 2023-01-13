import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible'
import 'normalize.css'
// vant方法函数不能使用自动导入，需要自己引入
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'
const app = createApp(App)

app.use(router)

app.mount('#app')
