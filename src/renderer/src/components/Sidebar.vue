<template>
    <aside class="h-screen w-64 bg-base-200 p-4 flex flex-col">
        <img src="../assets//logo.png" alt="" srcset="" class="w-40 h-auto py-2">
        <ul class="menu flex-1 gap-2">
            <li>
                <RouterLink to="/home" active-class="bg-accent text-gray-800 rounded-lg">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z" />
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z" />
                    </svg>

                    Dashboard
                </RouterLink>
            </li>
            <li>
                <details>
                    <summary class="flex items-center gap-2">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                                clip-rule="evenodd" />
                        </svg>
                        Residents
                    </summary>
                    <ul>
                        <li>
                            <RouterLink to="/residents" active-class="bg-accent text-gray-800 rounded-lg">
                                All Residents
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/households" active-class="bg-accent text-gray-800 rounded-lg">
                                Households
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/newresident" active-class="bg-accent text-gray-800 rounded-lg">
                                New Resident
                            </RouterLink>
                        </li>
                    </ul>
                </details>

            </li>
            <li>
                <details>
                    <summary class="flex items-center gap-2">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M18 5V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5M9 3v4a1 1 0 0 1-1 1H4m11.383.772 2.745 2.746m1.215-3.906a2.089 2.089 0 0 1 0 2.953l-6.65 6.646L9 17.95l.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z" />
                        </svg>
                        Certificates
                    </summary>
                    <ul>
                        <li>
                            <RouterLink to="/barangay-clearance" active-class="bg-accent text-gray-800 rounded-lg">
                                Barangay Clearance
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/residency" active-class="bg-accent text-gray-800 rounded-lg">
                                Certificate of Residency
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/indigency" active-class="bg-accent text-gray-800 rounded-lg">
                                Certificate of Indigency
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/good-moral" active-class="bg-accent text-gray-800 rounded-lg">
                                Certificate of Good Moral
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/low-income" active-class="bg-accent text-gray-800 rounded-lg">
                                Certificate of Low Income
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/jobseeker" active-class="bg-accent text-gray-800 rounded-lg">
                                First Time Job Seeker
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/issued-docs" active-class="bg-accent text-gray-800 rounded-lg">
                                Issued Documents
                            </RouterLink>
                        </li>
                    </ul>
                </details>
            </li>
            <li>
                <details>
                    <summary class="flex flex-items-center gap-2">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z" />
                        </svg>
                        Permits
                    </summary>
                    <ul>
                        <li>
                            <RouterLink to="/business-permit" active-class="bg-accent text-gray-800 rounded-lg">
                                Business Permit
                            </RouterLink>
                        </li>

                    </ul>
                </details>
            </li>
            <li>
                <details>
                    <summary class="flex flex-items-center gap-2">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        Blotter
                    </summary>
                    <ul>
                        <li>
                            <RouterLink to="/regular-blotter" active-class="bg-accent text-gray-800 rounded-lg">
                                Regular Blotter
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/vawc" active-class="bg-accent text-gray-800 rounded-lg">
                                VAWC Case
                            </RouterLink>
                        </li>
                        <li><a>New Case</a></li>
                    </ul>
                </details>
            </li>
            <li>
                <a active-class="bg-accent text-gray-800 rounded-lg" @click="openReportModal">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 17v-5h1.5a1.5 1.5 0 1 1 0 3H5m12 2v-5h2m-2 3h2M5 10V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v6M5 19v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1M10 3v4a1 1 0 0 1-1 1H5m6 4v5h1.375A1.627 1.627 0 0 0 14 15.375v-1.75A1.627 1.627 0 0 0 12.375 12H11Z" />
                    </svg>

                    Generate Report
                </a>
            </li>
            <li>

                <RouterLink to="/disclosure-policy" active-class="bg-accent text-gray-800 rounded-lg">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9.5 11.5 11 13l4-3.5M12 20a16.405 16.405 0 0 1-5.092-5.804A16.694 16.694 0 0 1 5 6.666L12 4l7 2.667a16.695 16.695 0 0 1-1.908 7.529A16.406 16.406 0 0 1 12 20Z" />
                    </svg>

                    Disclosure Policy
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/transactions" active-class="bg-accent text-gray-800 rounded-lg">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5" />
                    </svg>

                    Transaction History
                </RouterLink>
            </li>

        </ul>

        <div class="mt-auto mx-auto">
            <img src="../assets/barangay-logo.png" alt="" srcset="" class="w-40 h-auto py-2">
            <button class="btn btn-sm btn-error w-full" @click="logout">Logout</button>
        </div>
    </aside>
    <GenerateReport />
</template>

<script setup>


import { RouterLink, useRouter } from 'vue-router';
import GenerateReport from '../pages/secretary/report/GenerateReport.vue';
import { useUsers } from '../composables/useUsers';
const router = useRouter();
const { logout } = useUsers();

function gotoDashboard() {
    router.push('/home')
}

function gotoResidents() {
    router.push('/residents')
}



function openReportModal() {
    const modal = document.getElementById('reportModal')
    if (modal) modal.showModal()
}
</script>
