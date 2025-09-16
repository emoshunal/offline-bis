<template>
  <div class="p-6 bg-gray-50 min-h-screen">
  
   
    <!-- Recent Transactions / Activities -->
    <div class="card bg-white shadow p-4">
      <h2 class="text-lg font-semibold mb-4">Recent Transactions / Activities</h2>
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Resident</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in recentTransactions" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.resident }}</td>
              <td>{{ item.date }}</td>
              <td>
                <span
                  :class="item.status === 'Completed' ? 'badge badge-success' : 'badge badge-warning'"
                >
                  {{ item.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// Sample data (replace with actual offline database data)
const totalResidents = ref(1200);
const totalHouseholds = ref(350);
const seniorCitizens = ref(80);
const pwds = ref(25);
const pendingCases = ref(12);
const resolvedCases = ref(38);

const recentTransactions = ref([
  { id: 1, type: "Certificate of Residency", resident: "Juan Dela Cruz", date: "2025-09-01", status: "Completed" },
  { id: 2, type: "Business Permit", resident: "Ana Lopez", date: "2025-09-02", status: "Completed" },
  { id: 3, type: "Blotter Record", resident: "Pedro Reyes", date: "2025-09-02", status: "Pending" },
  { id: 4, type: "Barangay Clearance", resident: "Isabella Cruz", date: "2025-09-04", status: "Completed" },
  { id: 5, type: "Certificate of Indigency", resident: "Maria Santos", date: "2025-09-01", status: "Completed" },
]);


</script>

<style scoped>
.card {
  border-radius: 0.75rem;
}
.table-zebra tbody tr:nth-child(odd) {
  background-color: #f9fafb;
}
</style>
