
import {createRouter,createWebHistory} from 'vue-router';
import Log_in from './pages/Log_in.vue';
import Sign_Up from './pages/Sign_up.vue';
import referenti from './pages/referenti.vue';

const routes = [{
    path: '/login', component: Log_in,
   },
    {path: '/signup', component: Sign_Up,
    },
    {path:'/referenti:email', component: referenti,}
   
];

const router = createRouter({
    history: createWebHistory(),
    routes, 
});

export default router;