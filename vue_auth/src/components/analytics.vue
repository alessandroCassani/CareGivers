<template>
  <div class="chart-container">
    <canvas id="line"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import fc from "./fcLineChart";
import axios from "axios";

export default {
  name: "line",
  data() {
    return {
      fc: fc,
      client: null,
      topicPV: "cassa@gmail.com/pv",
      ruolo: sessionStorage.getItem("ruolo"),
      count: 0,
      chartInstance: null,
      isDataFetched: false, // Track whether data has been fetched
    };
  },

  mounted() {
    this.client = this.$store.state.selectedItem;

    if (!this.isPatient()) {
      this.client.subscribe(this.topicPV);
      this.$store.dispatch("updateSelectedItem", this.client);
    } else {
      this.fetchData("HR"); // Fetch initial data
      setInterval(() => {
        this.fetchData("HR"); //get data every 10 minutes
        console.log(this.count++);
      }, 5000);
    }
  },

  created() {
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },

  methods: {
    handleBeforeUnload() {
      event.preventDefault();
      event.returnValue = "";
    },

    isPatient() {
      return this.ruolo === "paziente";
    },

    fetchData(param) {
      let data = {
        field: param,
        collection: "cassa@gmail.com/vitalparameters",
      };

      axios
        .get("http://localhost:5005/getData", { params: data })
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            const newData = res.data.HR;
            this.updateChartData(newData);
            if (!this.isDataFetched) {
              this.createChart(); // Create the chart after the data has been fetched
              this.isDataFetched = true;
            }
          }
        });
    },

    createChart() {
      const ctx = document.getElementById("line");
      this.chartInstance = new Chart(ctx, this.fc);
    },

    updateChartData(newData) {
      this.fc.data.datasets[0].data.push(newData);
      if (this.chartInstance) {
        this.chartInstance.update(); // Update the chart
      }
    },
  },
};
</script>

<style>
.chart-container {
  width: 900px;
  height: 800px;
  margin-left: 10%;
}
</style>
