<template>
  <div class="chart-container">
    <canvas id="line"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import fc from "./fcLineChart";
import axios from "axios";
//import { onUnmounted } from "vue";

export default {
  name: "line",
  data() {
    return {
      fc: fc,
      client: null,
      topicPV: "cassa@gmail.com/pv",
      ruolo: sessionStorage.getItem("ruolo"),
    };
  },

  mounted() {
    this.client = this.$store.state.selectedItem;
    console.log(this.$store.state.selectedItem);
    console.log(this.client);

    if (!this.isPatient()) {
      this.client.subscribe(this.topicPV);
      this.$store.dispatch("updateSelectedItem", this.client);

      //on message methods
    } else {
      setInterval(() => {
        this.fetchData("HR"); //get data every 10 minutes
        this.fetchData("Spo2");
        this.fetchDataBP();
      }, 750);

      //  onUnmounted(() => {
      //    clearInterval(dataFromDb); //stop fetching data
      //  });
    }

    const ctx = document.getElementById("line");
    new Chart(ctx, this.fc);
  },

  methods: {
    isPatient() {
      //console.log(sessionStorage.getItem("ruolo"));
      return this.ruolo === "paziente";
    },

    fetchData(param) {
      let data = {
        field: param,
        collection: "cassa@gmail.com/vitalparameters", //modificare
      };
      //console.log(data);
      axios
        .get("http://localhost:5005/getData", { params: data })
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            this.fc.data.datasets.push(res.data);
          }
        });
    },

    async fetchDataBP() {
      let data = {
        field: "systolic",
        field2: "diastolic",
        collection: "cassa@gmail.com/vitalparameters", //modificare
      };
      //console.log(data);
      await axios
        .get("http://localhost:5005/getData", { params: data })
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            this.fc.data.datasets.push(res.data);
          }
        });
    },
  },
};
</script>

<style>
.chart-container {
  width: 900px;
  height: 800px; /* Imposta l'altezza desiderata */
  margin-left: 10%;
}
</style>
