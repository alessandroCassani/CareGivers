<script>
import {collapsed, toggleSidebar, sidebarwidth} from './state'
import SidebarLink from './SidebarLink.vue';
import '@fortawesome/fontawesome-free'


export default {
    props:{},
    components: { SidebarLink},
    setup(){
        return {collapsed, toggleSidebar, sidebarwidth}
    }
}
</script>

<template>
    <div class="sidebar" :style="{width: sidebarwidth}">
        <h1>
         <span v-if="collapsed">
         <div>V</div>
         <div>S</div>
         </span>
         <span v-else> careGivers</span>
        </h1>

        <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
        <SidebarLink to="/" icon="fas fa-columns">analytics</SidebarLink>
        <SidebarLink to="/" icon="fas fa-chart-bar">alert</SidebarLink>
        <SidebarLink to="/" icon="fas fa-users">promemoria</SidebarLink>
        <SidebarLink to="/" icon="fas fa-users">info</SidebarLink>
        
        <span class="collapse-icon" :class="{'rotate-180': collapsed}" @click="toggleSidebar">
            <i class="fas fa-angle-double-left"></i>

        </span>

    </div>
</template>

<style>
:root {
    --sidebar-bc-color: #2f855a;
    --sidebar-item-hover: #38a169;
    --sidebar-item-active: #276749;
}
</style>

<style scoped>
.sidebar{
    color: white;
    background-color: var(--sidebar-bc-color);

    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;

    transition: 0.3s ease;
    display: flex;
    flex-direction: column;
}

.collapse-icon{
    position: absolute;
    bottom: 0;
    padding: 0.75em;
    color: rgba(255,255,255,0.7);
    transition: 0.2s linear;
}

.rotate-180{
    transform: rotate(180deg);
    transition: 0.2s linear;
}
</style>