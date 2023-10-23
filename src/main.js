// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseToast from '@/components/base/BaseToast.vue'

const app = createApp(App)
const pinia = createPinia()

app.component('base-modal', BaseModal)
app.component('base-toast', BaseToast)

app.use(pinia)
app.mount('#app')
