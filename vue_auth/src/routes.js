
import {createRouter,createWebHistory} from 'vue-router';
import Log_in from './pages/Log_in.vue';
import Sign_Up from './pages/Sign_up.vue';


const routes = [{
    path: '/login', component: Log_in},
    {path: '/login', component: Sign_Up
}];

const router = createRouter({
    history: createWebHistory(),
    routes, 
});

export default router;