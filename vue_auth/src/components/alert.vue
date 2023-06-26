<template>
  <div>
    <button
      id="alert"
      style="
        background-color: red;
        border-radius: 5px;
        width: 200px;
        height: 90px;
        position: absolute;
        top: 90px;
        color: white;
        font-size: 26px;
      "
    >
      ALERT
    </button>
  </div>
</template>

<script>
export default {
  name: "alert",

  data() {
    return {
      data: "",
    };
  },

  computed: {
    isPatient() {
      return this.ruolo === "paziente";
    },
  },
};
</script>

<style>
.alert {
  width: 100px;
}
</style>
