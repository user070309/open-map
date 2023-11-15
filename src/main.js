import { createApp } from 'vue'
import App from '@/components/app/App.vue'
import uiComponents from './ui-components'
import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/styles.css"; // vue3-openlayers version < 1.0.0-*
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(OpenLayersMap /* options */);

uiComponents.map(component => app.component(component.name, component))
app.mount('#app')