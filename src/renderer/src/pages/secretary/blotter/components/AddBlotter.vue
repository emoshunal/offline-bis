<!-- BlotterModal.vue -->
<template>
    <dialog id="blotterModal" class="modal">
        <form method="dialog" class="modal-box max-w-3xl">
            <h3 class="font-bold text-lg mb-4">Blotter Report Form</h3>
            <p class="text-sm text-gray-500">
                Please fill out the form below to create a new blotter record.
                Provide complete and accurate information for proper documentation.
            </p>
            <div class="max-h-[70vh] overflow-y-auto pr-2 space-y-4 pt-4">
                <hr class=" text-gray-200">
                <div>
                    <p class="font-semibold text-sm text-gray-700 mb-2">Blotter Type</p>
                    <select class="select">
                        <option disabled selected>Select Blotter Type</option>
                        <option>Regular Blotter</option>
                        <option>Violence Against Woman and Children</option>

                    </select>
                </div>
                <!-- Complainant Information -->
                <div>
                    <p class="font-semibold text-sm text-gray-700 mb-2">Complainant Information</p>
                    <div class="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Full Name" class="input input-bordered w-full"
                            v-model="blotter.complainant.name" />
                        <input type="text" placeholder="Contact Number" class="input input-bordered w-full"
                            v-model="blotter.complainant.contact" />
                        <input type="text" placeholder="Address" class="input input-bordered w-full col-span-2"
                            v-model="blotter.complainant.address" />
                    </div>
                </div>

                <!-- Respondent Information -->
                <div>
                    <p class="font-semibold text-sm text-gray-700 mb-2">Respondent Information</p>
                    <div class="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Full Name" class="input input-bordered w-full"
                            v-model="blotter.respondent.name" />
                        <input type="text" placeholder="Contact Number" class="input input-bordered w-full"
                            v-model="blotter.respondent.contact" />
                        <input type="text" placeholder="Address" class="input input-bordered w-full col-span-2"
                            v-model="blotter.respondent.address" />
                    </div>
                </div>
                <div>
                    <button class="btn btn-default btn-circle"><svg class="w-4 h-4 text-gray-800 dark:text-white"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 12h14m-7 7V5" />
                        </svg>

                    </button>
                </div>

                <!-- Incident Details -->
                <div>
                    <p class="font-semibold text-sm text-gray-700 mb-2">Incident Details</p>
                    <div class="grid grid-cols-2 gap-4">
                        <input type="date" class="input input-bordered w-full" v-model="blotter.incident.date" />
                        <input type="time" class="input input-bordered w-full" v-model="blotter.incident.time" />
                        <input type="text" placeholder="Location" class="input input-bordered w-full col-span-2"
                            v-model="blotter.incident.location" />
                        <textarea placeholder="Incident Description"
                            class="textarea textarea-bordered w-full col-span-2" rows="4"
                            v-model="blotter.incident.description"></textarea>
                    </div>
                </div>

                <!-- Status -->
                <div>
                    <p class="font-semibold text-sm text-gray-700 mb-2">Status</p>
                    <select class="select select-bordered w-full" v-model="blotter.status">
                        <option disabled value="">Select status</option>
                        <option>Pending</option>
                        <option>Under Investigation</option>
                        <option>Resolved</option>
                    </select>
                </div>
            </div>

            <!-- Actions -->
            <div class="modal-action">
                <button class="btn btn-primary" @click="saveBlotter">Save Report</button>
                <button class="btn">Close</button>
            </div>
        </form>
    </dialog>
</template>

<script setup>
import { reactive } from 'vue'

const blotter = reactive({
    complainant: { name: '', contact: '', address: '' },
    respondent: { name: '', contact: '', address: '' },
    incident: { date: '', time: '', location: '', description: '' },
    status: ''
})

function saveBlotter() {
    console.log('Blotter Saved:', blotter)
    // Save to database or clear form here
}
</script>
