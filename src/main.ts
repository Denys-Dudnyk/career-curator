import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'

import 'primeicons/primeicons.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import Aura from '@primeuix/themes/aura'
import PrimeVue from 'primevue/config'

import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Sidebar from 'primevue/drawer'
import InputText from 'primevue/inputtext'
import Menubar from 'primevue/menubar'

import ConfirmationService from 'primevue/confirmationservice'
import ProgressSpinner from 'primevue/progressspinner'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import './assets/main.css'
import { initAuth } from './firebase/auth'
import { firebaseApp } from './firebase/firebase'

const app = createApp(App)

firebaseApp

app.use(createPinia())

app.use(ToastService)
app.use(ConfirmationService)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue',
      },
      darkModeSelector: '',
    },
  },
})

app.component('AppMenubar', Menubar)
app.component('AppSidebar', Sidebar)
app.component('AppButton', Button)
app.component('AppAvatar', Avatar)
app.component('app-toast', Toast)
app.component('AppInput', InputText)
app.component(
  'AppProgress',
  ProgressSpinner,
)

initAuth().then(() => {
  app.use(router)
  app.mount('#app')
})
