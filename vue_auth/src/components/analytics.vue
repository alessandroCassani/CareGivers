<template>
  <canvas id="line"></canvas>
</template>

<script>
import Chart from "chart.js";
import planetChartData from "./LineChart";

export default {
  name: "line",
  data() {
    return {
      planetChartData: planetChartData,
    };
  },

  mounted() {
    const ctx = document.getElementById("line");
    new Chart(ctx, this.planetChartData);
  },
};
</script>
