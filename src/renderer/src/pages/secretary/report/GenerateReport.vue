<template>
    <dialog id="reportModal" class="modal">
        <div class="modal-box w-11/12 max-w-4xl">
            <h3 class="font-bold text-xl mb-1">Generate Reports</h3>
            <p class="text-sm text-gray-500 mb-4">
                Select a date range and report type to generate and export records.
            </p>

            <!-- Filters -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <!-- From Date -->
                <div>
                    <label class="label"><span class="label-text">From</span></label>
                    <input type="date" v-model="filters.from" class="input input-bordered w-full" />
                </div>

                <!-- To Date -->
                <div>
                    <label class="label"><span class="label-text">To</span></label>
                    <input type="date" v-model="filters.to" class="input input-bordered w-full" />
                </div>

                <!-- Report Type -->
                <div>
                    <label class="label"><span class="label-text">Report Type</span></label>
                    <select v-model="filters.type" class="select select-bordered w-full">
                        <option disabled value="">Select Type</option>
                        <option>Residents</option>
                        <option>Blotter</option>
                        <option>Certificates Issued</option>
                        <option>VAWC Cases</option>
                    </select>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-2 mb-4">
                <button class="btn btn-outline" @click="clearFilters">Clear</button>
                <button class="btn btn-primary" @click="generateReport">Generate</button>
            </div>

            <!-- Table Preview -->
            <div class="overflow-x-auto border rounded-lg max-h-80 overflow-y-auto">
                <table class="table table-sm">
                    <thead class="bg-base-200 sticky top-0">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>type</th>
                            <th>Date Issued</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in results" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.resident }}</td>
                            <td>{{ item.type }}</td>
                            <td>{{ item.dateIssued }}</td>
                        </tr>
                        <tr v-if="!results.length">
                            <td colspan="4" class="text-center text-gray-400">No records found</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Export Button -->
            <div class="flex justify-end gap-2 mt-4">
                <!-- PDF -->
                <button class="btn btn-error flex items-center gap-2" :disabled="!results.length"
                    @click="exportReport('pdf')">
                    <!-- PDF Icon -->
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 17v-5h1.5a1.5 1.5 0 1 1 0 3H5m12 2v-5h2m-2 3h2M5 10V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v6M5 19v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1M10 3v4a1 1 0 0 1-1 1H5m6 4v5h1.375A1.627 1.627 0 0 0 14 15.375v-1.75A1.627 1.627 0 0 0 12.375 12H11Z" />
                    </svg>

                    PDF
                </button>

                <!-- Excel -->
                <button class="btn btn-success flex items-center gap-2" :disabled="!results.length"
                    @click="exportReport('excel')">
                    <!-- Excel Icon -->
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 10V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v6M5 19v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1M10 3v4a1 1 0 0 1-1 1H5m2.665 9H6.647A1.647 1.647 0 0 1 5 15.353v-1.706A1.647 1.647 0 0 1 6.647 12h1.018M16 12l1.443 4.773L19 12m-6.057-.152-.943-.02a1.34 1.34 0 0 0-1.359 1.22 1.32 1.32 0 0 0 1.172 1.421l.536.059a1.273 1.273 0 0 1 1.226 1.718c-.2.571-.636.754-1.337.754h-1.13" />
                    </svg>

                    Excel
                </button>

                <!-- Word -->
                <button class="btn btn-neutral flex items-center gap-2" :disabled="!results.length"
                    @click="exportReport('word')">
                    <!-- Word Icon -->
                    <svg class="w-6 h-6 text-gray-200 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 10V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v6M5 19v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1M10 3v4a1 1 0 0 1-1 1H5m14 9.006h-.335a1.647 1.647 0 0 1-1.647-1.647v-1.706a1.647 1.647 0 0 1 1.647-1.647L19 12M5 12v5h1.375A1.626 1.626 0 0 0 8 15.375v-1.75A1.626 1.626 0 0 0 6.375 12H5Zm9 1.5v2a1.5 1.5 0 0 1-1.5 1.5v0a1.5 1.5 0 0 1-1.5-1.5v-2a1.5 1.5 0 0 1 1.5-1.5v0a1.5 1.5 0 0 1 1.5 1.5Z" />
                    </svg>

                    Word
                </button>
            </div>


            <!-- Close -->
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>
</template>

<script setup>
import { ref } from 'vue'

const filters = ref({
    from: '',
    to: '',
    type: ''
})

const results = ref([])

function generateReport() {
    // Replace with your logic to fetch filtered data
    results.value = [

        { id: 1, resident: "Juan Dela Cruz", type: "Residency", dateIssued: "2025-09-13" },
        { id: 2, resident: "Maria Santos", type: "Indigency", dateIssued: "2025-09-12" },
        { id: 3, resident: "Pedro Reyes", type: "Good Moral", dateIssued: "2025-09-11" },
        { id: 4, resident: "Ana Lopez", type: "Residency", dateIssued: "2025-09-10" },
        { id: 5, resident: "Carlos Mendoza", type: "Low Income", dateIssued: "2025-09-09" },
        { id: 6, resident: "Luisa Ramirez", type: "Indigency", dateIssued: "2025-09-08" },
        { id: 7, resident: "Jose Fernandez", type: "Residency", dateIssued: "2025-09-08" },
        { id: 8, resident: "Isabella Cruz", type: "First Time Job Seeker", dateIssued: "2025-09-07" },
        { id: 9, resident: "Miguel Castillo", type: "Good Moral", dateIssued: "2025-09-07" },
        { id: 10, resident: "Sofia Gutierrez", type: "Low Income", dateIssued: "2025-09-06" },
        { id: 11, resident: "Andrea Morales", type: "Indigency", dateIssued: "2025-09-06" },
        { id: 12, resident: "Ramon Torres", type: "Residency", dateIssued: "2025-09-05" },
        { id: 13, resident: "Carla Navarro", type: "Good Moral", dateIssued: "2025-09-05" },
        { id: 14, resident: "Diego Ramos", type: "Residency", dateIssued: "2025-09-04" },
        { id: 15, resident: "Julia Bautista", type: "First Time Job Seeker", dateIssued: "2025-09-03" },
        { id: 16, resident: "Fernando Cruz", type: "Indigency", dateIssued: "2025-09-03" },
        { id: 17, resident: "Natalia Gomez", type: "Residency", dateIssued: "2025-09-02" },
        { id: 18, resident: "Victor Santos", type: "Low Income", dateIssued: "2025-09-01" },
        { id: 19, resident: "Emilia Flores", type: "Good Moral", dateIssued: "2025-09-01" },
        { id: 20, resident: "Pablo Hernandez", type: "Indigency", dateIssued: "2025-08-31" }
    ]
}

function clearFilters() {
    filters.value = { from: '', to: '', type: '' }
    results.value = []
}

function exportReport() {
    // Add export logic (PDF/Excel)
    alert('Exporting report...')
}
</script>
