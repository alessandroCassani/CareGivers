
import {createRouter,createWebHistory} from 'vue-router';
import Log_in from '../frontend/src/components/Log_in.vue';
import Sign_Up from '../frontend/src/components/Sign_up.vue';
import referenti from '../frontend/src/components/referenti.vue';
import memos from '../frontend/src/components/memos.vue';
import alert from '../frontend/src/components/alert.vue';
import analytics from '../frontend/src/components/analytics'

const routes = [{
    path: '/login', component: Log_in, name:"login",},
    {path: '/signup', component: Sign_Up, name:"signUp"},
    {path:'/referenti', component: referenti, name:'referenti'},
    {path: '/memos', component: memos, name: 'memos'},
    {path: '/alert', component: alert, name: 'alert'},
    {path: '/analytics', component: analytics, name:'analytics'}
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes, 
});

export default router;