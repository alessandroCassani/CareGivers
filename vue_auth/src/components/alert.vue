<template>
  <Side_bar> </Side_bar>
</template>

<script>
import Side_bar from "@/components/Side_bar.vue";
import sidebarWidth from "@/components/state";

export default {
  name: "alert",
  components: { Side_bar },

  data() {
    return {
      data: "",
      sidebarWidth,
    };
  },

  computed: {
    isPatient() {
      console.log(sessionStorage.getItem("ruolo") + " COMPUTED");
      return this.ruolo === "paziente";
    },
  },
};
</script>

<style></style>
