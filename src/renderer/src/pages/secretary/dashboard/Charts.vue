<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
    <!-- Residents by Age (Bar Chart) -->
    <div class="card p-4 shadow-lg rounded-lg flex flex-col justify-center items-start">
      <h3 class="text-md font-semibold mb-2">Residents by Age</h3>
      <canvas id="residentsAgeChart"></canvas>
    </div>

    <!-- Residents by Gender (Pie Chart) -->
    <div class="card p-4 shadow-lg rounded-lg ">
      <h3 class="text-md font-semibold mb-2">Residents by Gender</h3>
      <canvas id="residentsGenderChart"></canvas>
    </div>

    <!-- Cases by Status (Bar Chart) -->
    <div class="card p-4 shadow-lg rounded-lg flex flex-col justify-center items-start">
      <h3 class="text-md font-semibold mb-2">Cases by Status</h3>
      <canvas id="casesStatusChart"></canvas>
    </div>

    <!-- Cases by Type (Pie Chart) -->
    <div class="card p-4 shadow-lg rounded-lg">
      <h3 class="text-md font-semibold mb-2">Cases by Type</h3>
      <canvas id="casesTypeChart"></canvas>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import Chart from "chart.js/auto";

export default {
  setup() {
    onMounted(() => {
      // Residents by Age (Bar Chart)
      new Chart(document.getElementById("residentsAgeChart"), {
        type: "bar",
        data: {
          labels: ["0-17", "18-30", "31-50", "51+"],
          datasets: [{
            label: "Number of Residents",
            data: [40, 250, 20, 10],
            backgroundColor: ["#3b82f6","#10b981","#f59e0b","#ef4444"]
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } }
        }
      });

      // Residents by Gender (Pie Chart)
      new Chart(document.getElementById("residentsGenderChart"), {
        type: "pie",
        data: {
          labels: ["Male", "Female"],
          datasets: [{
            data: [60, 60],
            backgroundColor: ["#3b82f6","#f472b6"]
          }]
        },
        options: { responsive: true }
      });

      // Cases by Status (Bar Chart)
      new Chart(document.getElementById("casesStatusChart"), {
        type: "bar",
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

      // Cases by Type (Pie Chart)
      new Chart(document.getElementById("casesTypeChart"), {
        type: "pie",
        data: {
          labels: ["Dispute", "Theft", "Vandalism", "Others"],
          datasets: [{
            data: [4, 3, 5, 3],
            backgroundColor: ["#3b82f6","#10b981","#f59e0b","#ef4444"]
          }]
        },
        options: { responsive: true }
      });
    });
  }
};
</script>
