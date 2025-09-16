<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        <!-- <div class="card bg-primary text-primary-content p-4 flex flex-col justify-between shadow-lg rounded-lg">
            <div class="flex items-center justify-between">
                <div>
                    <div class="text-sm font-medium">Total Active Residents</div>
                    <div class="mt-2 text-3xl font-bold">120</div>
                </div>
                <svg class="w-10 h-10 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                        d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                </svg>

            </div>
        </div>
  
        <div class="card bg-secondary text-secondary-content p-4 flex flex-col justify-between shadow-lg rounded-lg">
            <div class="flex items-center justify-between">
                <div>
                    <div class="text-sm font-medium">Total Households</div>
                    <div class="mt-2 text-3xl font-bold">85</div>
                </div>
                <svg class="w-10 h-10 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                </svg>
            </div>

        </div>


        <div class="card bg-accent text-accent-content p-4 flex flex-col justify-between shadow-lg rounded-lg">
            <div class="flex items-center justify-between">
                <div>
                    <div class="text-sm font-medium">Total Blotter Cases</div>
                    <div class="mt-2 text-3xl font-bold">15</div>
                </div>
                <svg class="w-10 h-10 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>

        </div>

        <div class="card bg-info text-info-content p-4 flex flex-col justify-between shadow-lg rounded-lg">
            <div class="flex items-center justify-between">
                <div>
                    <div class="text-sm font-medium">Issued Certificates</div>
                    <div class="mt-2 text-3xl font-bold">5</div>
                </div>
                <svg class="w-10 h-10 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 3v4a1 1 0 0 1-1 1H5m4 6 2 2 4-4m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z" />
                </svg>

            </div>

        </div>  -->
        <div class="card bg-white shadow border-1 border-gray-200 p-4 rounded-xl flex flex-row justify-around">
            <div class="">
                <div class="text-sm font-semibold text-gray-500">Total Residents</div>
                <div class="text-2xl font-bold">{{ totalResidents }}</div>
            </div>
            <div>
                <svg class="w-12 h-12 text-blue-500 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                        d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                </svg>

            </div>

        </div>
        <div class="card bg-white shadow border-1 border-gray-200 p-4 rounded-xl flex flex-row justify-around">
            <div>
                <div class="text-sm font-semibold text-gray-500">Total Households</div>
                <div class="text-2xl font-bold">{{ totalHouseholds }}</div>
            </div>
            <div>
                <svg class="w-12 h-12 text-green-700 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                </svg>

            </div>

        </div>
        <div class="card bg-white shadow border-1 border-gray-200 p-4 rounded-xl flex flex-row justify-around">
            <div>
                <div class="text-sm font-semibold text-gray-500">Senior Citizens</div>
                <div class="text-2xl font-bold">{{ seniorCitizens }}</div>
            </div>

            <div>
                <svg class="w-12 h-12 text-yellow-500 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

            </div>

        </div>
        <div class="card bg-white shadow border-1 border-gray-200 p-4 rounded-xl flex flex-row justify-around">
            <div>
                <div class="text-sm font-semibold text-gray-500">PWDs</div>
                <div class="text-2xl font-bold">{{ pwds }}</div>
            </div>
            <div>
                <svg class="w-12 h-12 text-purple-400 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                </svg>

            </div>

        </div>
        <div class="card bg-white shadow border-1 border-gray-200 p-4 rounded-xl flex flex-row justify-around">
            <div>
                <div class="text-sm font-semibold text-gray-500">Pending Cases</div>
                <div class="text-2xl font-bold">{{ pendingCases }}</div>
            </div>
            <div>
                <svg class="w-12 h-12 text-orange-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

            </div>
        </div>
        <div class="card bg-white shadow border-1 border-gray-200 p-4 rounded-xl flex flex-row justify-around">
            <div>
                <div class="text-sm font-semibold text-gray-500">Resolved Cases</div>
                <div class="text-2xl font-bold">{{ resolvedCases }}</div>
            </div>
            <div>
                <svg class="w-12 h-12 text-teal-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

            </div>
        </div>


    </div>
</template>

<script setup>
import { ref } from "vue";
const totalResidents = ref(8978);
const totalHouseholds = ref(752);
const seniorCitizens = ref(102);
const pwds = ref(25);
const pendingCases = ref(12);
const resolvedCases = ref(38);
</script>
