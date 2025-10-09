<template>
    <div class="pt-8">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <div class="breadcrumbs text-sm pb-8">
                <ul>
                    <li style="font-family: satoshi;">
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                class="h-4 w-4 stroke-current">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z">
                                </path>
                            </svg>
                            Home
                        </a>
                    </li>
                    <li style="font-family: satoshi;">
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                class="h-4 w-4 stroke-current">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z">
                                </path>
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
                            Lists
                        </span>
                    </li>
                </ul>
            </div>
            <!-- <div class="w-[200px] text-right">
                <h1 v-if="currentUser" style="font-family: satoshi-bold;" class="capitalize text-gray-500 text-xl"> {{ currentUser.username }}</h1>
                <p v-if="currentUser" style="font-family: satoshi-light;" class="text-sm">{{ currentUser.user_role }}</p>
            </div> -->
        </div>

        <!-- <div class="my-2 flex justify-between items-center">
            <button class="btn btn-accent btn-circle"><svg class="w-4 h-4 text-gray-800 dark:text-white"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    viewBox="0 0 24 24">
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
        </div> -->
      
            <ResidentsTable :residents="residents" />
          
       
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUsers } from '../../../composables/useUsers'
import { useResidents } from '../../../composables/useResidents'
import ResidentsTable from './components/ReidentsTable.vue'

const {residents, fetchResidents } = useResidents()

onMounted(async() => {
    await fetchResidents()
});

const { currentUser } = useUsers()

</script>

