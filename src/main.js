import { createApp } from 'vue'
import './style.css'
import './index.css'
import App from './App.vue'
import router from './router'; 
import Vuesax from 'vuesax3';
import 'vuesax3/dist/vuesax.css'; // Importa el CSS de Vuesax

const app = createApp(App);

app.use(router); // Usa el router
app.use(Vuesax); // Asegúrate de que Vuesax esté incluido aquí
app.mount('#app');
