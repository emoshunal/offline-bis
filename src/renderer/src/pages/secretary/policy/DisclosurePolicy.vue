<template>
  <div class="p-6 bg-base-100 rounded-2xl shadow">
    <h2 class="text-2xl font-bold mb-2">Barangay Full Disclosure Policy</h2>
    <p class="text-sm text-gray-500 mb-6">
      This section shows all mandatory barangay financial and procurement documents for transparency.
    </p>

    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>Document</th>
            <th>Type</th>
            <th>Period</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doc in disclosureDocs" :key="doc.id">
            <td class="font-medium">{{ doc.name }}</td>
            <td>{{ doc.type }}</td>
            <td>{{ doc.period }}</td>
            <td>
              <span
                :class="doc.posted ? 'badge badge-success' : 'badge badge-warning'"
              >
                {{ doc.posted ? 'Posted' : 'Pending' }}
              </span>
            </td>
            <td class="flex gap-2">
              <button class="btn btn-xs btn-info flex items-center gap-1">
                <!-- Eye Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7
                         -2.268 7-7.542 7-8.268-2.943-9.542-7z" />
                </svg>
                View
              </button>

              <button class="btn btn-xs btn-success flex items-center gap-1">
                <!-- Download Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
                Download
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const disclosureDocs = ref([
  { id: 1, name: 'Annual Budget', type: 'Financial', period: 'FY 2025', posted: true },
  { id: 2, name: 'Quarterly Financial Report', type: 'Financial', period: 'Q2 2025', posted: true },
  { id: 3, name: 'Procurement Plan', type: 'Procurement', period: '2025', posted: false },
  { id: 4, name: 'Barangay Development Plan', type: 'Planning', period: '2025-2027', posted: true },
  { id: 5, name: 'Annual Investment Program', type: 'Planning', period: '2025', posted: false },
])
</script>
