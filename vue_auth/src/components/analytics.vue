<template>
  <div class="chart-container">
    <canvas id="line"></canvas>
    <canvas id="lineSpO2"></canvas>
    <canvas id="lineBP"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import fc from "./fcLineChart";
import spO2 from "./spO2LineChart";
import bp from "./BPLineChart";
import axios from "axios";

export default {
  name: "line",
  data() {
    return {
      fc: fc,
      spO2: spO2,
      bp: bp,
      client: null,
      topicPV: "cassa@gmail.com/pv",
      ruolo: sessionStorage.getItem("ruolo"),
      count: 0,
      chartInstanceFC: null,
      chartInstanceSpO2: null,
      chartInstanceBP: null,
      isDataFetched: false, // Track whether data has been fetched
    };
  },

  mounted() {
    this.client = this.$store.state.selectedItem;

    if (!this.isPatient()) {
      this.client.subscribe(this.topicPV);
      this.client.on("message", (topic, message) => {
        const payload = message.toString(); // Convert payload to string
        const data = JSON.parse(payload);
        console.log(data); // Parse JSON message into an object
        this.createChart();
        this.updateChartData(data); // Update the chart data with the received message
        this.updateChart();
      });

      this.$store.dispatch("updateSelectedItem", this.client);
    } else {
      this.createChart();
      this.fetchData("HR"); // Fetch initial data
      this.fetchData("SpO2");
      this.fetchData("bp");
      //console.log("mounted");
      setInterval(() => {
        this.fetchData("HR"); //get data every 10 minutes
        this.fetchData("SpO2");
        this.fetchData("bp");
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
        collection: "cassa@gmail.com/vitalparameters", //modificare
      };

      if (param === "bp") {
        data = {
          field: "systolic",
          field2: "diastolic",
          collection: "cassa@gmail.com/vitalparameters", //modificare
        };
      }

      await axios
        .get("http://localhost:5005/getData", { params: data })
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            const newData = res.data;
            //console.log("updateChartData");
            this.updateChartData(newData);
            if (!this.isDataFetched) {
              //  console.log("createChart");
              this.createChart(); // Create the chart after the data has been fetched
              this.isDataFetched = true;
            } else {
              // console.log("updateChart");
              this.updateChart();
            }

            this.client.publish(this.topicPV, JSON.stringify(newData));
          }
        });
    },

    createChart() {
      const ctxFC = document.getElementById("line");
      this.chartInstanceFC = new Chart(ctxFC, this.fc);

      const ctxSpO2 = document.getElementById("lineSpO2");
      this.chartInstanceSpO2 = new Chart(ctxSpO2, this.spO2);

      const ctxBP = document.getElementById("lineBP");
      this.chartInstanceBP = new Chart(ctxBP, this.bp);
    },

    updateChart() {
      if (this.chartInstanceFC) {
        this.chartInstanceFC.update(); // Update the chart if the chart instance exists
      }
      if (this.chartInstanceSpO2) {
        this.chartInstanceSpO2.update(); // Update the chart if the chart instance exists
      }
      if (this.chartInstanceBP) {
        this.chartInstanceBP.update(); // Update the chart if the chart instance exists
      }
    },

    updateChartData(newData) {
      const date = new Date();
      const timeLabel = date.getHours() + ":" + date.getMinutes();

      // Create new arrays for labels and data points
      if (newData.HR != null) {
        const newLabelsFC = [...this.fc.data.labels, timeLabel];
        const newDataPointsFC = [...this.fc.data.datasets[0].data, newData.HR];

        // Limit the number of data points displayed on the chart
        const maxDataPoints = 10;
        if (newLabelsFC.length > maxDataPoints) {
          newLabelsFC.shift();
          newDataPointsFC.shift();
        }

        // Update the chart instance with the new arrays
        this.chartInstanceFC.data.labels = newLabelsFC;
        this.chartInstanceFC.data.datasets[0].data = newDataPointsFC;

        // Update the chart
        this.updateChart();
      }
      if (newData.SpO2 != null) {
        const newLabelsSpO2 = [...this.spO2.data.labels, timeLabel];
        const newDataPointsSpo2 = [
          ...this.spO2.data.datasets[0].data,
          newData.SpO2,
        ];

        // Limit the number of data points displayed on the chart
        const maxDataPoints = 10;
        if (newLabelsSpO2.length > maxDataPoints) {
          newLabelsSpO2.shift();
          newDataPointsSpo2.shift();
        }

        // Update the chart instance with the new arrays
        this.chartInstanceSpO2.data.labels = newLabelsSpO2;
        this.chartInstanceSpO2.data.datasets[0].data = newDataPointsSpo2;

        // Update the chart
        this.updateChart();
      }
      if (newData.systolic != null) {
        const newLabelsBP = [...this.bp.data.labels, timeLabel];
        const newDataPointsBPsys = [
          ...this.bp.data.datasets[0].data,
          newData.systolic,
        ];

        const newDataPointsBPdias = [
          ...this.bp.data.datasets[1].data,
          newData.diastolic,
        ];

        // Limit the number of data points displayed on the chart
        const maxDataPoints = 10;
        if (newLabelsBP.length > maxDataPoints) {
          newLabelsBP.shift();
          newDataPointsBPsys.shift();
          newDataPointsBPdias.shift();
        }

        // Update the chart instance with the new arrays
        this.chartInstanceBP.data.labels = newLabelsBP;
        this.chartInstanceBP.data.datasets[0].data = newDataPointsBPsys;
        this.chartInstanceBP.data.datasets[1].data = newDataPointsBPdias;

        // Update the chart
        this.updateChart();
      }
    },
  },
};
</script>

<style>
.chart-container {
  width: 900px;
  height: 800px;
  font-size: large;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  gap: 70px; /* Adjust the gap value as needed */
}
</style>
