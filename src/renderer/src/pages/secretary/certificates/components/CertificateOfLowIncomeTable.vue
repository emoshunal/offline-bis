<template>
    <div class="flex flex-wrap justify-between items-end py-4 gap-3">

        <div class="flex items-end gap-3">
            <div class="flex flex-col">
                <label class="text-xs text-gray-600 mb-1">From</label>
                <input type="date" v-model="startDate"
                    class="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring focus:ring-blue-300" />
            </div>
            <div class="flex flex-col">
                <label class="text-xs text-gray-600 mb-1">To</label>
                <input type="date" v-model="endDate"
                    class="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring focus:ring-blue-300" />
            </div>
            <button @click="clearDateRange"
                class="h-[32px] px-3 text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md transition-all">
                Clear
            </button>
        </div>


        <div class="flex items-end">
            <label
                class="input flex items-center gap-2 border border-gray-300 rounded-md px-2 py-1 text-sm focus-within:ring focus-within:ring-blue-300">
                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
                        stroke="currentColor">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input type="search" v-model="searchQuery" class="grow focus:outline-none" placeholder="Search table" />
                <kbd class="kbd kbd-sm">⌘</kbd>
                <kbd class="kbd kbd-sm">K</kbd>
            </label>

        </div>
    </div>

    <div class="w-full">


        <vue-good-table max-height="60vh" styleClass="vgt-table bordered striped condensed" :line-numbers="true"
            :columns="columns" :rows="filteredRows" :pagination-options="{
                enabled: true,
                perPage: 10,
                rowsPerPageLabel: 'Records per page',
                perPageDropdown: [10, 20, 50, 100, 200],
                dropdownAllowAll: true,
                infoFn: (params) =>
                    `Showing ${params.firstRecordOnPage} to ${params.lastRecordOnPage} of page ${params.currentPage}`,
            }" class="rounded-lg">
            <template #table-row="props">
                <!-- Actions column -->
                <template v-if="props.column.field === 'actions'">
                    <div class="dropdown dropdown-left dropdown-center">
                        <div tabindex="0" role="button" class="rounded-full hover:bg-gray-200 cursor-pointer">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                    d="M12 6h.01M12 12h.01M12 18h.01" />
                            </svg>
                        </div>
                        <ul tabindex="0"
                            class="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow border-1 border-gray-200">
                            <li><a>Edit</a></li>
                            <hr class="my-1 border-gray-300" />
                            <li><a>Delete</a></li>
                            <li><a>View</a></li>
                            <li><a>Print</a></li>
                        </ul>
                    </div>
                </template>

                <!-- Other columns -->
                <template v-else>
                    <span v-html="props.column.formatter
                        ? props.column.formatter(props.row[props.column.field], props.row)
                        : props.row[props.column.field]
                        "></span>
                </template>
            </template>
        </vue-good-table>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { VueGoodTable } from "vue-good-table-next";
import { useCertifications } from "../../../../composables/useCertifications";

const { fetchCerts, certs } = useCertifications();

const startDate = ref("");
const endDate = ref("");
const searchQuery = ref("");

const columns = [
    { label: "Full Name", field: "resident_name", sortable: true, filterOptions: { enabled: true, placeholder: "Search Name..." } },
    { label: "Purpose", field: "purpose", sortable: true, filterOptions: { enabled: true, placeholder: "Search Purpose..." } },
    { label: "Date Issued", field: "date_issued", sortable: true },
    { label: "Actions", field: "actions" },
];

const filteredRows = computed(() => {
    return certs.value
        .filter((row) => {
            if (!startDate.value && !endDate.value) return true;
            const rowDate = new Date(row.date_issued).toISOString().split("T")[0];
            if (startDate.value && !endDate.value) return rowDate >= startDate.value;
            if (!startDate.value && endDate.value) return rowDate <= endDate.value;
            return rowDate >= startDate.value && rowDate <= endDate.value;
        })
        .filter((row) => {
            if (!searchQuery.value) return true;
            const query = searchQuery.value.toLowerCase();
            return Object.values(row).some((val) =>
                String(val).toLowerCase().includes(query)
            );
        })
        .map((row, index) => ({
            ...row,
            index: index + 1,
        }));
});

const clearDateRange = () => {
    startDate.value = "";
    endDate.value = "";
};

onMounted(async () => {
    await fetchCerts("Certificate of Low Income");
});
</script>
