<template>
    <div class="card p-4 shadow-lg rounded-lg h-96">
        <h3 class="text-md font-semibold mb-2">Gender Distribution</h3>
        <canvas id="genderChart"></canvas>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
onMounted(() => {
    // Gender Chart
    new Chart(document.getElementById("genderChart"), {
        type: "doughnut",
        data: {
            labels: ["Male", "Female"],
            datasets: [
                {
                    data: [3054, 4234],
                    backgroundColor: ["#3b82f6", "#f43f5e"]
                }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: "right" } }
        }
    });

});
</script>