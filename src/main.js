import { createApp } from 'vue'
import App from '@/components/app/App.vue'
import uiComponents from './ui-components'
import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/styles.css"; // vue3-openlayers version < 1.0.0-*
import { createPinia } from 'pinia'
import * as ConfirmDialog from 'vuejs-confirm-dialog'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(ConfirmDialog)
app.use(OpenLayersMap)
uiComponents.map(component => app.component(component.name, component))
app.mount('#app')