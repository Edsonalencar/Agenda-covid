import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'
import './plugins/chartsVue'

// Router
import { Router } from './router';

// fortawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const app = createApp(App);

app.use(Router);
app.use(createPinia())

app.component('fa', FontAwesomeIcon)
app.mount('#app');
