import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vClickOutside from "click-outside-vue3"

const axiosInstance = axios.create({
    baseURL: ''
})

const app = createApp(App)
    .use(store)
    .use(router)
    .use(vClickOutside)
    app.config.globalProperties.$axios = { ...axiosInstance }
    app.mount('#app')
