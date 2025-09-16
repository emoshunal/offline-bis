<template>
    <div class="card p-4 shadow-lg rounded-lg h-96">
        <h2 class="text-lg font-semibold mb-2">Age Distribution</h2>
        <canvas id="populationPieChart"></canvas>
    </div>

</template>

<script setup>
import { onMounted } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

onMounted(() => {
    // Pie Chart - Population by Gender / Age
    new Chart(document.getElementById("populationPieChart"), {
        type: "pie",
        data: {
            labels: ["Children (0-12)", "Teens (13-18)", "Adults (19-60)", "Senior Citizens (60+)"],
            datasets: [{
                data: [200, 150, 700, 100],
                backgroundColor: ["#3b82f6", "#fbbf24", "#10b981", "#f43f5e"]
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: "right" } }
        }
    });

});
</script>