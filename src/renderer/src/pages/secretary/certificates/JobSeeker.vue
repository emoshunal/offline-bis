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
                        Certificates
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
                        Issuance
                    </span>
                </li>
            </ul>
        </div>
        <div class="my-2 flex justify-between items-center">
            <!-- Open the modal using ID.showModal() method -->
            <button class="btn btn-accent btn-circle" @click="openModal"><svg
                    class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 12h14m-7 7V5" />
                </svg>
            </button>
            <dialog ref="myModal" class="modal">
                <div class="modal-box">
                    <h3 class="text-lg font-bold">Certificate of First Time Job Seeker</h3>
                    <p class="text-sm text-gray-500 mb-4">
                        Please fill out the required details to issue a certificate of first time job seeker for the resident.
                    </p>
                    <div class="rounded-xl p-4">
                        <form class="space-y-4">

                            <!-- Resident Details -->
                            <div>
                                <label class="label">
                                    <span class="label-text">Resident Name</span>
                                </label>
                                <input type="text" @input="filterResidents" v-model="search"
                                    placeholder="Type to search resident..." class="input input-bordered w-full" />

                                <ul v-if="filtered.length"
                                    class="border rounded mt-1 max-h-40 overflow-y-auto bg-white">
                                    <li v-for="resident in filtered" :key="resident.id"
                                        @click="selectResident(resident)" class="p-2 hover:bg-gray-100 cursor-pointer">
                                        {{ resident.name }}
                                    </li>
                                </ul>

                            </div>
                            <div v-if="selectedResident" class="mt-4 flex gap-2">
                                <label class="label">Tags: </label>

                                <!-- If tags are present -->
                                <div v-if="selectedResident.tags && selectedResident.tags.length"
                                    class="badge badge-warning">
                                    <p class="my-2">
                                        <span v-for="tag in selectedResident.tags" :key="tag">
                                            {{ tag }}
                                        </span>
                                    </p>
                                </div>

                                <!-- If tags are empty -->
                                <div v-else class="badge badge-success">
                                    <p class="my-2">Eligible for the certificate</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="label">
                                        <span class="label-text">Length of Residency</span>
                                    </label>
                                    <input type="text" placeholder="30" value="12 years"
                                        class="input input-bordered w-full" disabled />
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="label">
                                        <span class="label-text">Sex</span>
                                    </label>
                                    <input type="text" placeholder="30" value="Male" class="input input-bordered w-full"
                                        disabled />
                                </div>
                                <div>
                                    <label class="label">
                                        <span class="label-text">Purok</span>
                                    </label>
                                    <input type="text" placeholder="30" value="Purok 7"
                                        class="input input-bordered w-full" disabled />
                                </div>
                            </div>

                            <!-- Clearance Details -->

                            <div>
                                <label class="label">
                                    <span class="label-text">Date Issued</span>
                                </label>
                                <input type="date" class="input input-bordered w-full" />
                            </div>

                            <!-- Certificate Number -->
                            <div>
                                <label class="label">
                                    <span class="label-text">Certificate Control Number</span>
                                </label>
                                <input type="text" placeholder="CJ-2025-001" value="CJ-2025-001"
                                    class="input input-bordered w-full" disabled />
                            </div>
                        </form>
                    </div>
                    <div class="modal-action ">
                        <form method="dialog">
                            <button class="btn btn-accent mr-2">Issue Certificate</button>
                            <button class="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

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
        <!-- Resident Search -->
        <!-- <div>
      <label class="block mb-1 font-medium">Resident Name</label>
      <input type="text" v-model="search" placeholder="Type to search..." class="w-full border rounded p-2"
        @input="filterResidents" />
      <ul v-if="filtered.length" class="border rounded mt-1 max-h-40 overflow-y-auto bg-white">
        <li v-for="resident in filtered" :key="resident.id" @click="selectResident(resident)"
          class="p-2 hover:bg-gray-100 cursor-pointer">
          {{ resident.name }}
        </li>
      </ul>
    </div> -->

        <!-- Issued Clearances Table -->

        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table class="min-w-full table table-auto border-collapse border border-gray-300">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="border border-gray-300 px-4 py-2 text-left">#</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">Resident Name</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">Date Issued</th>
                        <th class="border border-gray-300 px-4 py-2 text-left">Status</th>
                        <th class="border border-gray-300 px-4 py-2 text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="hover:bg-gray-50" v-for="clearance in clearances" :key="clearance.id">
                        <td class="border border-gray-300 px-4 py-2">{{ clearance.id }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ clearance.resident }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ clearance.purpose }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ clearance.dateIssued }}</td>
                        <td class="border border-gray-300 px-4 py-2">
                            <span :class="{
                                'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium': clearance.status === 'Issued',
                                'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium': clearance.status === 'Pending',
                            }">
                                {{ clearance.status }}
                            </span>
                        </td>
                        <td class="border border-gray-300 px-4 py-2">
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
                                    <li><a>Remove</a></li>
                                    <li><a href="#">Print</a></li>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: "",
            selectedResident: null,
            residents: [
                { id: 1, name: "Juan Dela Cruz", tags: "Under investigation" },
                { id: 2, name: "Maria Santos", tags: "" },
                { id: 3, name: "Pedro Reyes", tags: "" },
                { id: 4, name: "Ana Lopez", tags: "" },
                { id: 5, name: "Carlos Mendoza", tags: "" },
                { id: 6, name: "Luisa Ramirez", tags: "" },
                { id: 7, name: "Jose Fernandez", tags: "" },
                { id: 8, name: "Isabella Cruz", tags: "Has pending case" },
                { id: 9, name: "Miguel Castillo", tags: "" },
                { id: 10, name: "Sofia Gutierrez", tags: "" },
                { id: 11, name: "Andres Morales", tags: "" },
                { id: 12, name: "Camila Torres", tags: "" },
                { id: 13, name: "Ramon Navarro", tags: "" },
                { id: 14, name: "Elena Dominguez", tags: "" },
                { id: 15, name: "Francisco Rivera", tags: "" },
                { id: 16, name: "Gabriela Ortega", tags: "" },
                { id: 17, name: "Ricardo Villanueva", tags: "Has pending case" },
                { id: 18, name: "Patricia Salazar", tags: "" },
                { id: 19, name: "Diego Alvarez", tags: "" },
                { id: 20, name: "Valentina Ramos", tags: "" },
            ],
            filtered: [],
            clearances: [
                { id: 1, resident: "Alfredo Santos", dateIssued: "2025-09-13", status: "Issued" },
                { id: 2, resident: "Beatriz Ramos", dateIssued: "2025-09-12", status: "Issued" },
                { id: 3, resident: "Christian Navarro", dateIssued: "2025-09-11", status: "Issued" },
                { id: 4, resident: "Danica Flores", dateIssued: "2025-09-10", status: "Issued" },
                { id: 5, resident: "Ernesto Cruz", dateIssued: "2025-09-09", status: "Issued" },
                { id: 6, resident: "Fatima Villanueva", dateIssued: "2025-09-08", status: "Issued" },
                { id: 7, resident: "Gabriel Mendoza", dateIssued: "2025-09-08", status: "Issued" },
                { id: 8, resident: "Hannah Del Rosario", dateIssued: "2025-09-07", status: "Issued" },
                { id: 9, resident: "Ian Castillo", dateIssued: "2025-09-07", status: "Issued" },
                { id: 10, resident: "Janelle Torres", dateIssued: "2025-09-06", status: "Issued" },
            ],
        };
    },
    methods: {
        filterResidents() {
            const query = this.search.toLowerCase();
            this.filtered = this.residents
                .filter((r) => r.name.toLowerCase().includes(query))
                .slice(0, 20);
        },
        selectResident(resident) {
            this.selectedResident = resident;
            this.search = resident.name;
            this.filtered = [];
            // populate other fields if needed
        },
    },
};
</script>
<script setup>
import { ref } from 'vue'

const myModal = ref(null)

const openModal = () => {
    myModal.value?.showModal()
}
</script>
