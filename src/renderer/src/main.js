import './assets/main.css'

import { createApp } from 'vue'


import router from './router'
import App from './App.vue'
import 'vue-good-table-next/dist/vue-good-table-next.css'


const app = createApp(App)

app.use(router)
app.mount('#app')