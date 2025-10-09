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
            <!-- <dialog ref="myModal" class="modal">
                <div class="modal-box">
                    <h3 class="text-lg font-bold">Certificate of Residency Issuance</h3>
                    <p class="text-sm text-gray-500 mb-4">
                        Please fill out the required details to issue a certificate of residency for the resident.
                    </p>
                    <div class="rounded-xl p-4">
                        <form class="space-y-4">

                      
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

                          
                                <div v-if="selectedResident.tags && selectedResident.tags.length"
                                    class="badge badge-warning">
                                    <p class="my-2">
                                        <span v-for="tag in selectedResident.tags" :key="tag">
                                            {{ tag }}
                                        </span>
                                    </p>
                                </div>

                            
                                <div v-else class="badge badge-success">
                                    <p class="my-2">Eligible for the certificate</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="label">
                                        <span class="label-text">Age</span>
                                    </label>
                                    <input type="number" placeholder="30" value="30" class="input input-bordered w-full"
                                        disabled />
                                </div>
                                <div>
                                    <label class="label">
                                        <span class="label-text">Civil Status</span>
                                    </label>
                                    <input type="text" placeholder="30" value="Single"
                                        class="input input-bordered w-full" disabled />
                                </div>
                            </div>

                         
                            <div>
                                <label class="label">
                                    <span class="label-text">Purpose</span>
                                </label>
                                <input type="text" placeholder="e.g. Job application"
                                    class="input input-bordered w-full" />
                            </div>

                            <div>
                                <label class="label">
                                    <span class="label-text">Date Issued</span>
                                </label>
                                <input type="date" class="input input-bordered w-full" />
                            </div>

                    
                            <div>
                                <label class="label">
                                    <span class="label-text">Certificate Control Number</span>
                                </label>
                                <input type="text" placeholder="CR-2025-001" value="CR-2025-001"
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
            </dialog> -->


        </div>
        <CertificateOfResidencyTable />
    </div>

</template>

<script setup>
import { ref } from 'vue'
import CertificateOfResidencyTable from './components/CertificateOfResidencyTable.vue'


const myModal = ref(null)

const openModal = () => {
    myModal.value?.showModal()
}
</script>
