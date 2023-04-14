
<script>
import Side_bar from '@/components/Side_bar.vue';
import { sidebarWidth } from '@/components/state';
export default {
  name: 'my_Home',
  components: {Side_bar},
  setup(){
    return {sidebarWidth}
  }
}; 
</script>

<template>
 <Side_bar></Side_bar>
  <div :style="{ 'margin-left': sidebarWidth}"></div>
</template>

