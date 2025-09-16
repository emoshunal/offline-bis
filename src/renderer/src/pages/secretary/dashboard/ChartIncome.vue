<template>

    <!-- Income & Livelihood Chart -->
    <div class="card bg-white shadow p-4 h-96">
        <h2 class="text-lg font-semibold">Income & Livelihood</h2>
        <canvas id="incomeLivelihoodChart"></canvas>
    </div>

</template>

<script setup>
import { onMounted } from "vue";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

onMounted(() => {

    // Income & Livelihood - Donut Chart
    new Chart(document.getElementById("incomeLivelihoodChart"), {
        type: "doughnut",
        data: {
            labels: ["Farming", "Fishing", "Small Business", "Employment"],
            datasets: [
                {
                    data: [120, 80, 150, 90],
                    backgroundColor: ["#10b981", "#f43f5e", "#3b82f6", "#fbbf24"]
                }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: "right" } },
            cutout: '50%'
        }
    });
});
</script>

