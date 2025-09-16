<template>
  <div class="card bg-white shadow p-4 h-96">
    <h2 class="text-lg font-semibold mb-2">Socioeconomic Status (Based on Income)</h2>
    
    <!-- Donut Chart -->

      <canvas id="socioeconomicChart"></canvas>


    <!-- Description -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

onMounted(() => {
  new Chart(document.getElementById("socioeconomicChart"), {
    type: "doughnut",
    data: {
      labels: ["Poor", "Low-income", "Lower-middle", "Middle-middle", "Upper-middle", "High-income"],
      datasets: [{
        data: [351, 480, 45, 24, 12, 5], // Sample numbers of households
        backgroundColor: ["#f43f5e", "#fbbf24", "#3b82f6", "#10b981", "#8b5cf6", "#06b6d4"]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "right" } },
      cutout: '60%' // Donut thickness
    }
  });
});
</script>

<style scoped>
.card { border-radius: 0.75rem; }
</style>
