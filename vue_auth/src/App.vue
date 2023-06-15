<template>
  <div class="container"></div>
  <Side_bar></Side_bar>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<script>
import Side_bar from "./components/Side_bar.vue";

export default {
  name: "App",
  components: { Side_bar },
};
</script>
