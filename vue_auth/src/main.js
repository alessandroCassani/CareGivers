import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import mqttModule form './mqtt'


const app = createApp(App);
app.use(router);
app.use(mqttModule)
app.mount('#app');