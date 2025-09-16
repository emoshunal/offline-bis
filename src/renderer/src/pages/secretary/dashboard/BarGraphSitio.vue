<template>
  <div class="card bg-white p-4 shadow h-96">
    <!-- Title -->
    <h2 class="text-lg font-semibold mb-2">Residents by Purok</h2>

    <!-- Chart -->
    <div class="flex-1">
      <canvas id="populationBarChart"></canvas>
    </div>

    <!-- Description -->
 
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

onMounted(() => {
  new Chart(document.getElementById("populationBarChart"), {
    type: "bar",
    data: {
      labels: ["Purok 1", "Purok 2", "Purok 3", "Purok 4", "Purok 5", "Purok 6", "Purok 7"],
      datasets: [{
        label: "Number of Residents",
        data: [1120, 1200, 1450, 3180, 1190, 1000, 1200],
        backgroundColor: "#3b82f6"
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
});
</script>
