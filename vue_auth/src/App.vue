<script>
import Sidebar from './components/Side_bar.vue';
import { sidebarWidth } from './components/state';
export default {
  name: 'App',
  components: {Sidebar},
  setup(){
    return {sidebarWidth}
  }
}; 
</script>

<template>
  <Sidebar />
  <div :style="{ 'margin-left': sidebarWidth}"></div>
</template>

