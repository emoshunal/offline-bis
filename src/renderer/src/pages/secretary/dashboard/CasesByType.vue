<template>
    <div class="card p-4 shadow-lg rounded-lg flex flex-col justify-center items-start">
        <h3 class="text-md font-semibold mb-2">Cases by Status</h3>
        <canvas id="casesStatusChart"></canvas>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
onMounted(() => {
    // Gender Chart
      new Chart(document.getElementById("casesStatusChart"), {
        type: "pie",
        data: {
          labels: ["Pending", "Resolved", "Under Mediation"],
          datasets: [{
            label: "Cases",
            data: [5, 7, 3],
            backgroundColor: ["#f59e0b","#10b981","#3b82f6"]
          }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      });

});
</script>