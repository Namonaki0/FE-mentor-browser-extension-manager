import { createApp } from 'vue'
import App from './App.vue'
import { pinia } from './stores'
import './styles/main.scss'

createApp(App).use(pinia).mount('#app')