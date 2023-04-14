
import {createRouter,createWebHistory} from 'vue-router';
import Log_in from './pages/Log_in.vue';
import Sign_Up from './pages/Sign_up.vue';
import home from './pages/my_Home.vue';

const routes = [{
    path: '/login', component: Log_in,
   },
    {path: '/signup', component: Sign_Up,
    },
    {path:'/home', component: home,}
   
];

const router = createRouter({
    history: createWebHistory(),
    routes, 
});

export default router;