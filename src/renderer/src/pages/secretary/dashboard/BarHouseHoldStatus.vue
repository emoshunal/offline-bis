<template>
    <div class="card bg-white shadow p-4 h-96">
        <h2 class="text-lg font-semibold mb-2">Household Status</h2>
        <canvas id="householdStatusChart"></canvas>
       
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

onMounted(() => {
    new Chart(document.getElementById("householdStatusChart"), {
        type: "bar",
        data: {
            labels: ["Purok 1", "Purok 2", "Purok 3", "Purok 4", "Purok 5", "Purok 6", "Purok 7"],
            datasets: [
                {
                    label: "Single-Parent",
                    data: [144, 168, 132, 180, 108, 156, 166],
                    backgroundColor: "#3b82f6"
                },
                {
                    label: "Multi-Generational",
                    data: [216, 252, 198, 270, 162, 234, 249],
                    backgroundColor: "#f59e0b"
                },
                {
                    label: "Single-Person",
                    data: [96, 112, 88, 120, 72, 104, 111],
                    backgroundColor: "#10b981"
                },
                {
                    label: "Nuclear Family",
                    data: [480, 560, 440, 600, 360, 520, 553],
                    backgroundColor: "#f43f5e"
                },
                {
                    label: "Extended Family",
                    data: [180, 210, 165, 225, 135, 195, 207],
                    backgroundColor: "#f472b6"
                },
                {
                    label: "Other",
                    data: [84, 98, 77, 105, 63, 91, 97],
                    backgroundColor: "#fbbf24"
                }
            ]
        },

        options: {
            responsive: true,
            plugins: { legend: { position: "top" } },
            scales: {
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true }
            }
        }
    });
});


</script>