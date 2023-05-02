<script>
import {collapsed, toggleSidebar, sidebarWidth} from './state'
import SidebarLink from './SidebarLink.vue';



export default {
    props:{},
    components: {SidebarLink},
    setup(){
        return {collapsed, toggleSidebar, sidebarWidth}
    }
}
</script>

<template>
    <div class="sidebar" :style="{width: sidebarwidth}">
        <br>
        <h1>
         <span v-if="collapsed">
         <div class="scritta">
         <div>C</div>
         <div>A</div>
         <div>R</div>
         <div>E</div>
         <div>G</div>
         <div>I</div>
         <div>V</div>
         <div>E</div>
         <div>R</div>
         <div>S</div>
        </div>
         </span>
         <span v-else>&nbsp;careGivers</span>
        </h1>

        <br><br><br>
        <SidebarLink to="/" >analytics</SidebarLink>
        <br>
        <SidebarLink to="/" >alert</SidebarLink>
        <br>
        <SidebarLink to="/">promemoria</SidebarLink>
        <br>
        <SidebarLink to="/">referenti</SidebarLink>
        <br>
        <SidebarLink to="/">info</SidebarLink>
        
        <span class="collapse-icon" :class="{'rotate-180': collapsed}" @click="toggleSidebar">
            <i class="fas fa-angle-double-left"></i>

        </span>

    </div>
</template>

<style>
:root {
    --sidebar-bc-color: #3D2022;
    --sidebar-item-hover: #c79598;
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
    padding: 0.4em;
    padding-right: 70px;

    transition: 0.3s ease;
    display: flex;
    text-align: center;
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