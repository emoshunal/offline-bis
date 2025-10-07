<template>

    <div class="flex gap-2 mb-2">
        <button class="btn btn-sm btn-accent" @click="exportCSV">Export CSV</button>
        <button class="btn btn-sm btn-accent" @click="exportExcel">Export Excel</button>
    </div>

    <vue-good-table styleClass="vgt-table bordered" :columns="columns" :rows="users" :fixed-header="true"
        :pagination-options="{ enabled: true, perPage: 10 }" :search-options="{ enabled: true }" class="rounded-lg">
        <template #table-row="props" styleClass="vgt-table bordered">
            <span v-if="props.column.field === 'actions'" class="flex gap-2">
                <IconButton icon="edit" @click="$emit('edit', props.row)" />
                <IconButton icon="lock" @click="$emit('lock', props.row)" />
            </span>
            <span v-else
                v-html="props.column.formatter ? props.column.formatter(props.row[props.column.field], props.row) : props.row[props.column.field]"></span>

        </template>
    </vue-good-table>

</template>

<script setup>
import { computed } from 'vue';
import { VueGoodTable } from 'vue-good-table-next'
import IconButton from '../../../../components/Shared/IconButton.vue'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const props = defineProps({
    users: { type: Array, required: true }
})

const columns = [
    {
        label: 'ID',
        field: 'user_id',
        sortable: true,
        filterOptions: {
            enabled: true,
        }
    },
    {
        label: 'Full Name',
        field: 'fullname',
        sortable: true,
        filterOptions: {
            enabled: true,
        }
    },

    {
        label: 'Role',
        field: 'user_role',
        sortable: true,
        filterOptions: {
            enabled: true,
            filterValue: '',
            filterDropdownItems: ['Admin', 'Secretary', 'Treasurer', 'Kagawad'],
            filterDropdown: true
        }
    },
    {
        label: 'Status',
        field: 'status',
        sortable: true,
        filterOptions: {
            enabled: true,
            filterValue: '',
            filterDropdownItems: [
                { text: 'Active', value: 1 },
                { text: 'Locked', value: 0 }
            ],
            filterDropdown: true
        },
        formatter: (value) => {
            if (value === 1) {
                return `
        <div class="badge badge-success flex items-center gap-1">
         <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
</svg>
 active
        </div>
      `;
            } else {
                return `
        <div class="badge badge-error flex items-center gap-1">
          <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"/>
</svg> locked
        </div>
      `;
            }
        }
    }

    ,
    {
        label: 'Created At',
        field: 'created_at',
        type: 'date',
        sortable: true,
        filterOptions: {
            enabled: true,
            filterValue: '',
            filterFn: (rowValue, filterValue) => {
                if (!filterValue) return true;
                const rowDate = new Date(rowValue);
                const filterDate = new Date(filterValue);
                return rowDate >= filterDate;
            }
        },
        dateInputFormat: 'yyyy-MM-dd HH:mm:ss', // corrected
        dateOutputFormat: 'MMM dd, yyyy HH:mm' // optional display format
    }
    ,

    { label: 'Actions', field: 'actions' }
]

const rows = computed(() => props.users || [])
// --- CSV Export ---
const exportCSV = () => {
    if (!rows.value.length) return;
    const csvRows = rows.value.map(u => ({
        ID: u.user_id,
        Username: u.username,
        Role: u.user_role
    }));

    const csvContent = [
        Object.keys(csvRows[0]).join(','), // header
        ...csvRows.map(r => Object.values(r).join(',')) // rows
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'users.csv');
};

// --- Excel Export ---
const exportExcel = () => {
    if (!rows.value.length) return;
    const ws = XLSX.utils.json_to_sheet(rows.value.map(u => ({
        ID: u.user_id,
        Username: u.username,
        Role: u.user_role
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'users.xlsx');
}
</script>
