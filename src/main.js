import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/style.css'
import { language } from "@/i18n/index.js"
import { createI18n } from "vue-i18n"

const i18n = createI18n({
    legacy: true,
    locale: 'ru',
    fallbackLocale: 'en',
    messages: language
})

createApp(App).use(i18n).mount('#app')