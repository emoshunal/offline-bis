<template>
    <div class="pt-8">
        <div class="p-6 bg-base-100 rounded-2xl shadow">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="text-2xl font-bold">Transaction History</h2>
                    <p class="text-sm text-gray-500">
                        Review all certificate issuances, requests, and payments made in the system.
                    </p>
                </div>
            </div>

            <!-- Filters -->
            <div class="flex flex-row gap-4 items-end mb-6">
                <div class="form-control">
                    <label class="label text-sm">Start Date</label>
                    <input type="date" class="input input-bordered" v-model="filters.startDate" />
                </div>
                <div class="form-control">
                    <label class="label text-sm">End Date</label>
                    <input type="date" class="input input-bordered" v-model="filters.endDate" />
                </div>
                <div class="form-control">
                    <label class="label text-sm">Search</label>
                    <input type="text" placeholder="Search resident or type" class="input input-bordered w-full"
                        v-model="filters.search" />
                </div>
                <button class="btn btn-primary" @click="applyFilters">Filter</button>
            </div>

            <!-- Table -->
            <div class="overflow-y-auto max-h-[50vh]">
                <table class="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Resident</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Reference No.</th>
                            <th class="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="tx in filteredTransactions" :key="tx.id">
                            <td>#{{ tx.id }}</td>
                            <td>{{ tx.resident }}</td>
                            <td>{{ tx.type }}</td>
                            <td>{{ tx.date }}</td>
                            <td>
                                <span
                                    :class="tx.status === 'Completed' ? 'badge badge-success' : 'badge badge-warning'">
                                    {{ tx.status }}
                                </span>
                            </td>
                            <td class="flex justify-center gap-2">
                                <!-- View -->
                                <button class="btn btn-xs btn-info flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7
                         -2.268 7-7.542 7-8.268-2.943-9.542-7z" />
                                    </svg>
                                    View
                                </button>
                                <!-- Download -->
                                <button class="btn btn-xs btn-success flex items-center gap-1">
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
            <div class="flex justify-center items-center gap-2 mt-6">
                <div class="join">
                    <button class="join-item btn">«</button>
                    <button class="join-item btn">1</button>
                    <button class="join-item btn">»</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filters = ref({
    startDate: '',
    endDate: '',
    search: ''
})

const transactions = ref([
    { id: 1, type: "Certificate of Residency", resident: "Juan Dela Cruz", date: "2025-09-01", status: "Completed" },
    { id: 2, type: "Certificate of Indigency", resident: "Maria Santos", date: "2025-09-01", status: "Completed" },
    { id: 3, type: "Blotter Record", resident: "Pedro Reyes", date: "2025-09-02", status: "Pending" },
    { id: 4, type: "Business Permit", resident: "Ana Lopez", date: "2025-09-02", status: "Completed" },
    { id: 5, type: "Certificate of Good Moral", resident: "Carlos Mendoza", date: "2025-09-03", status: "Completed" },
    { id: 6, type: "Certificate of Low Income", resident: "Luisa Ramirez", date: "2025-09-03", status: "Pending" },
    { id: 7, type: "First Time Job Seeker Certificate", resident: "Jose Fernandez", date: "2025-09-04", status: "Completed" },
    { id: 8, type: "Barangay Clearance", resident: "Isabella Cruz", date: "2025-09-04", status: "Completed" },
    { id: 9, type: "Blotter Record", resident: "Miguel Castillo", date: "2025-09-05", status: "Pending" },
    { id: 10, type: "Certificate of Residency", resident: "Sofia Gutierrez", date: "2025-09-05", status: "Completed" },
    { id: 11, type: "Certificate of Indigency", resident: "Andres Rivera", date: "2025-09-06", status: "Completed" },
    { id: 12, type: "Business Permit", resident: "Paula Flores", date: "2025-09-06", status: "Completed" },
    { id: 13, type: "Certificate of Good Moral", resident: "Ramon Torres", date: "2025-09-07", status: "Pending" },
    { id: 14, type: "Certificate of Low Income", resident: "Carmen Ramos", date: "2025-09-07", status: "Completed" },
    { id: 15, type: "First Time Job Seeker Certificate", resident: "Francisco Cruz", date: "2025-09-08", status: "Completed" },
    { id: 16, type: "Barangay Clearance", resident: "Angela Navarro", date: "2025-09-08", status: "Pending" },
    { id: 17, type: "Blotter Record", resident: "Daniel Bautista", date: "2025-09-09", status: "Completed" },
    { id: 18, type: "Certificate of Residency", resident: "Marisol Hernandez", date: "2025-09-09", status: "Completed" },
    { id: 19, type: "Certificate of Indigency", resident: "Eduardo Ramos", date: "2025-09-10", status: "Completed" },
    { id: 20, type: "Business Permit", resident: "Victoria Santos", date: "2025-09-10", status: "Pending" },
    { id: 21, type: "Certificate of Good Moral", resident: "Ricardo Morales", date: "2025-09-11", status: "Completed" },
    { id: 22, type: "Certificate of Low Income", resident: "Beatriz Cruz", date: "2025-09-11", status: "Completed" },
    { id: 23, type: "First Time Job Seeker Certificate", resident: "Hector Garcia", date: "2025-09-12", status: "Pending" },
    { id: 24, type: "Barangay Clearance", resident: "Patricia Diaz", date: "2025-09-12", status: "Completed" },
    { id: 25, type: "Blotter Record", resident: "Fernando Gutierrez", date: "2025-09-13", status: "Pending" },
    { id: 26, type: "Certificate of Residency", resident: "Juliana Reyes", date: "2025-09-13", status: "Completed" },
    { id: 27, type: "Certificate of Indigency", resident: "Roberto Vargas", date: "2025-09-14", status: "Completed" },
    { id: 28, type: "Business Permit", resident: "Camila Ortega", date: "2025-09-14", status: "Completed" },
    { id: 29, type: "Certificate of Good Moral", resident: "Ignacio Alvarez", date: "2025-09-15", status: "Completed" },
    { id: 30, type: "Certificate of Low Income", resident: "Teresa Cruz", date: "2025-09-15", status: "Pending" },
])

const filteredTransactions = computed(() => {
    return transactions.value.filter(tx => {
        const matchSearch = tx.resident.toLowerCase().includes(filters.value.search.toLowerCase())
            || tx.type.toLowerCase().includes(filters.value.search.toLowerCase())

        const matchStart = filters.value.startDate ? tx.date >= filters.value.startDate : true
        const matchEnd = filters.value.endDate ? tx.date <= filters.value.endDate : true

        return matchSearch && matchStart && matchEnd
    })
})

function applyFilters() {
    // Placeholder if you want to call API or reload data
}
</script>
