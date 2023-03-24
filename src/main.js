import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages"
import App from './App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'normalize.css'
import '@picocss/pico/css/pico.classless.min.css'
import './assets/style.css'
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: navigator.language.split('-')[0],
    fallbackLocale: "en",
    availableLocales: ["en", "es"],
    messages: messages,
});
const app = createApp(App)
app.use(i18n)
app.use(createPinia())
app.use(router)
app.mount('#app')