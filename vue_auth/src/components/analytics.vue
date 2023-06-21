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
      this.createChart();
      this.fetchData("HR"); // Fetch initial data
      console.log("mounted");
      setInterval(() => {
        this.fetchData("HR"); //get data every 10 minutes
        console.log(this.count++);
      }, 10000);
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

    async fetchData(param) {
      let data = {
        field: param,
        collection: "cassa@gmail.com/vitalparameters",
      };

      await axios
        .get("http://localhost:5005/getData", { params: data })
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            const newData = res.data.HR;
            console.log("updateChartData");
            this.updateChartData(newData);
            if (!this.isDataFetched) {
              console.log("createChart");
              this.createChart(); // Create the chart after the data has been fetched
              this.isDataFetched = true;
            } else {
              console.log("updateChart");
              this.updateChart();
            }
          }
        });
    },

    createChart() {
      const ctx = document.getElementById("line");
      this.chartInstance = new Chart(ctx, this.fc);
    },

    updateChart() {
      if (this.chartInstance) {
        this.chartInstance.update(); // Update the chart if the chart instance exists
      }
    },

    updateChartData(newData) {
      const date = new Date();
      const timeLabel = date.getHours() + ":" + date.getMinutes();

      // Create new arrays for labels and data points
      const newLabels = [...this.fc.data.labels, timeLabel];
      const newDataPoints = [...this.fc.data.datasets[0].data, newData];

      // Limit the number of data points displayed on the chart
      const maxDataPoints = 10;
      if (newLabels.length > maxDataPoints) {
        newLabels.shift();
        newDataPoints.shift();
      }

      // Update the chart instance with the new arrays
      this.chartInstance.data.labels = newLabels;
      this.chartInstance.data.datasets[0].data = newDataPoints;

      // Update the chart
      this.updateChart();
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
