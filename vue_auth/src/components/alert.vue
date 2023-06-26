<template>
  <div>
    <button
      id="alert"
      v-if="isPatient"
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
      @click="sendEmergency()"
    >
      ALERT
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "alert",

  data() {
    return {
      data: "",
      client: null,
    };
  },

  mounted() {
    this.client = this.$store.state.selectedItem;
  },

  methods: {
    isPatient() {
      return this.ruolo === "paziente";
    },

    sendEmergency() {
      const userInput = window.prompt("Cosa succede?");
      const topic = sessionStorage.getItem("email") + "/urgentAlert";
      const data = {
        collection: sessionStorage.getItem("email") + "/vitalparameters",
      };

      axios.post("http://localhost:5005/getLastValue", data).then((res) => {
        if (res.status === 200) {
          //const result = {
          //fc: res.data.fc,
          //spO2: res.data.spO2,
          //systolic: res.data.systolic,
          //diastolic: res.data.diastolic,
          //issue: userInput,
          //};
          const stringMQTT =
            userInput +
            " FC = " +
            res.data.fc +
            " spO2 = " +
            res.data.spO2 +
            " systolic = " +
            res.data.systolic +
            " diastolic = " +
            res.data.diastolic;
          this.client.publish(topic, stringMQTT);
          alert("alert inviato");
        }
      });
    },
  },
};
</script>

<style>
.alert {
  width: 100px;
}
</style>
