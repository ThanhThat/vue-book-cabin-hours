// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

import App from './App.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseToast from '@/components/base/BaseToast.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseSpinner from '@/components/base/BaseSpinner.vue'

const app = createApp(App)
const pinia = createPinia()

app.component('base-modal', BaseModal)
app.component('base-toast', BaseToast)
app.component('base-input', BaseInput)
app.component('base-spinner', BaseSpinner)

app.use(pinia)
app.use(router)
app.mount('#app')
