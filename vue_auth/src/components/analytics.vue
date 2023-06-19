<template>
  <div class="app-container">
    <div class="chart-container">
      <canvas id="line"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import fc from "./fcLineChart";

export default {
  name: "line",
  data() {
    return {
      fc: fc,
    };
  },

  mounted() {
    const ctx = document.getElementById("line");
    new Chart(ctx, this.fc);
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
