<template>
    <div class="pt-8">
        <div class="breadcrumbs text-sm pb-8">
            <ul>
                <li style="font-family: satoshi;">
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="h-4 w-4 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                        Home
                    </a>
                </li>
                <li style="font-family: satoshi;">
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="h-4 w-4 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                        Residents
                    </a>
                </li>
                <li style="font-family: satoshi;">
                    <span class="inline-flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="h-4 w-4 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                            </path>
                        </svg>
                        Blotter
                    </span>
                </li>
            </ul>
        </div>
        <div class="my-2 flex justify-between items-center">
            <button class="btn btn-accent btn-circle" @click="openBlotterModal"><svg
                    class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 12h14m-7 7V5" />
                </svg>
            </button>
            <div class="flex justify-center items-center gap-4">

                <label class="input">
                    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
                            stroke="currentColor">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" class="grow" placeholder="Search" />
                    <kbd class="kbd kbd-sm">⌘</kbd>
                    <kbd class="kbd kbd-sm">K</kbd>
                </label>
                <button class="btn btn-circle">
                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                            d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
                    </svg>

                </button>

            </div>

        </div>
        <div class="overflow-y-auto max-h-[65vh] rounded-box border border-base-content/5 bg-base-100">
            <table class="min-w-full table table-auto border-collapse border border-gray-300">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="border border-gray-300 px-4 py-2 text-left">#</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">Complainant</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">Respondent</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">Date</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">Location</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">Status</th>
                        <th class="border border-gray-300 px-4 py-2 text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(blotter, index) in blotters" :key="blotter.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ blotter.complainant }}</td>
                        <td>{{ blotter.respondent }}</td>
                        <td>{{ blotter.date }}</td>
                        <td>{{ blotter.location }}</td>
                        <td>
                            <span class="badge" :class="{
                                'badge-warning': blotter.status === 'Pending',
                                'badge-info': blotter.status === 'Under Investigation',
                                'badge-success': blotter.status === 'Resolved'
                            }">
                                {{ blotter.status }}
                            </span>
                        </td>
                        <td>
                            <div class="dropdown dropdown-hover">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                    viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                        d="M12 6h.01M12 12h.01M12 18h.01" />
                                </svg>

                                <ul tabindex="0"
                                    class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li><a>View</a></li>
                                    <li><a>Update</a></li>
                                    <li><a>Print</a></li>
                                </ul>
                            </div>
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
        <AddBlotter />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import AddBlotter from './components/AddBlotter.vue'

const blotters = ref([
    { id: 1, complainant: 'Juan Dela Cruz', respondent: 'Pedro Reyes', date: '2025-09-14', location: 'Barangay Hall', status: 'Pending' },
    { id: 2, complainant: 'Maria Santos', respondent: 'Ana Lopez', date: '2025-09-13', location: 'Purok 3', status: 'Under Investigation' },
    { id: 3, complainant: 'Carlos Mendoza', respondent: 'Jose Fernandez', date: '2025-09-12', location: 'Mabini St.', status: 'Resolved' },
    { id: 4, complainant: 'Luisa Ramirez', respondent: 'Miguel Castillo', date: '2025-09-11', location: 'Purok 1', status: 'Pending' },
    { id: 5, complainant: 'Ramon Torres', respondent: 'Angela Navarro', date: '2025-09-10', location: 'Barangay Hall', status: 'Resolved' },
    { id: 6, complainant: 'Carmen Ramos', respondent: 'Francisco Cruz', date: '2025-09-09', location: 'Purok 2', status: 'Under Investigation' },
    { id: 7, complainant: 'Eduardo Ramos', respondent: 'Victoria Santos', date: '2025-09-08', location: 'Mabini St.', status: 'Pending' },
    { id: 8, complainant: 'Ricardo Morales', respondent: 'Beatriz Cruz', date: '2025-09-07', location: 'Purok 4', status: 'Resolved' },
    { id: 9, complainant: 'Hector Garcia', respondent: 'Patricia Diaz', date: '2025-09-06', location: 'Barangay Hall', status: 'Pending' },
    { id: 10, complainant: 'Fernando Gutierrez', respondent: 'Juliana Reyes', date: '2025-09-05', location: 'Purok 5', status: 'Under Investigation' },
    { id: 11, complainant: 'Roberto Vargas', respondent: 'Camila Ortega', date: '2025-09-04', location: 'Mabini St.', status: 'Resolved' },
    { id: 12, complainant: 'Ignacio Alvarez', respondent: 'Teresa Cruz', date: '2025-09-03', location: 'Barangay Hall', status: 'Pending' },
    { id: 13, complainant: 'Isabella Cruz', respondent: 'Jose Fernandez', date: '2025-09-02', location: 'Purok 1', status: 'Resolved' },
    { id: 14, complainant: 'Sofia Gutierrez', respondent: 'Andres Rivera', date: '2025-09-01', location: 'Purok 3', status: 'Under Investigation' },
    { id: 15, complainant: 'Paula Flores', respondent: 'Ramon Torres', date: '2025-08-31', location: 'Mabini St.', status: 'Pending' },
    { id: 16, complainant: 'Victoria Santos', respondent: 'Ricardo Morales', date: '2025-08-30', location: 'Purok 2', status: 'Resolved' },
    { id: 17, complainant: 'Francisco Cruz', respondent: 'Angela Navarro', date: '2025-08-29', location: 'Barangay Hall', status: 'Under Investigation' },
    { id: 18, complainant: 'Luisa Ramirez', respondent: 'Carlos Mendoza', date: '2025-08-28', location: 'Purok 4', status: 'Pending' },
    { id: 19, complainant: 'Juan Dela Cruz', respondent: 'Maria Santos', date: '2025-08-27', location: 'Mabini St.', status: 'Resolved' },
    { id: 20, complainant: 'Pedro Reyes', respondent: 'Jose Fernandez', date: '2025-08-26', location: 'Purok 5', status: 'Under Investigation' },
    { id: 21, complainant: 'Carmen Ramos', respondent: 'Eduardo Ramos', date: '2025-08-25', location: 'Barangay Hall', status: 'Pending' },
    { id: 22, complainant: 'Miguel Castillo', respondent: 'Hector Garcia', date: '2025-08-24', location: 'Purok 1', status: 'Resolved' },
    { id: 23, complainant: 'Angela Navarro', respondent: 'Fernando Gutierrez', date: '2025-08-23', location: 'Mabini St.', status: 'Under Investigation' },
    { id: 24, complainant: 'Jose Fernandez', respondent: 'Victoria Santos', date: '2025-08-22', location: 'Purok 2', status: 'Pending' },
    { id: 25, complainant: 'Roberto Vargas', respondent: 'Paula Flores', date: '2025-08-21', location: 'Barangay Hall', status: 'Resolved' },
    { id: 26, complainant: 'Juliana Reyes', respondent: 'Camila Ortega', date: '2025-08-20', location: 'Purok 3', status: 'Under Investigation' },
    { id: 27, complainant: 'Teresa Cruz', respondent: 'Ignacio Alvarez', date: '2025-08-19', location: 'Mabini St.', status: 'Pending' },
    { id: 28, complainant: 'Beatriz Cruz', respondent: 'Ricardo Morales', date: '2025-08-18', location: 'Purok 4', status: 'Resolved' },
    { id: 29, complainant: 'Patricia Diaz', respondent: 'Hector Garcia', date: '2025-08-17', location: 'Barangay Hall', status: 'Under Investigation' },
    { id: 30, complainant: 'Camila Ortega', respondent: 'Roberto Vargas', date: '2025-08-16', location: 'Purok 5', status: 'Pending' }
]);

function viewBlotter(blotter) {
    console.log('View blotter', blotter)
}

function editBlotter(blotter) {
    console.log('Edit blotter', blotter)
}

function deleteBlotter(id) {
    blotters.value = blotters.value.filter(b => b.id !== id)
}

function openBlotterModal() {
    const modal = document.getElementById('blotterModal')
    if (modal) modal.showModal()
}
</script>
