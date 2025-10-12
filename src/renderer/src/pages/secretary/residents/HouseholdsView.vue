<template>
  <div class="pt-8 min-h-screen">
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
                            Household
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
    <!-- Search & Add -->

    <!-- Table -->

    <HouseholdsTable />

    <!-- Pagination -->

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useResidents } from "../../../composables/useResidents";
import HouseholdsTable from "./components/HouseholdsTable.vue";

const { households, fetchHouseholds } = useResidents();

onMounted(async () => {
  await fetchHouseholds();
})
</script>

<style scoped>
.table-zebra tbody tr:nth-child(odd) {
  background-color: #f9fafb;
}
</style>
