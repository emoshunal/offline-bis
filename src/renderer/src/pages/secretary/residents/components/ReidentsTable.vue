<template>
  <div class="m-2 flex justify-between items-center">
    <div class="flex flex-wrap gap-3 items-center">
      <span class="font-semibold text-sm text-gray-700">Columns visibility</span>
      <label v-for="col in columns" :key="col.field" class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" v-model="visibleColumnFields" :value="col.field" class="checkbox checkbox-sm" />
        <span class="text-sm">{{ col.label }}</span>
      </label>
    </div>
    <button class="btn btn-accent btn-circle"><svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M5 12h14m-7 7V5" />
      </svg>
    </button>
  </div>


  <vue-good-table max-height="60vh" styleClass="vgt-table bordered" :columns="visibleColumns" :rows="rows"
    :fixed-header="true" @on-rows-change="handleRowsChange" :pagination-options="{
      enabled: true, perPage: 10, rowsPerPageLabel: 'Records per page',
      perPageDropdown: [10, 20, 50, 100, 200], dropdownAllowAll: true,
      infoFn: (params) => `Showing ${params.firstRecordOnPage} to ${params.lastRecordOnPage} of page ${params.currentPage}`,
    }" :search-options="{ enabled: true }" class="rounded-lg">

    <template #table-row="props" styleClass="vgt-table bordered">
      <span :class="{
        'font-bold text-base': ['resident_name'].includes(props.column.field),
        'text-sm text-red-600': props.column.field === 'tags',
        'text-base': !['resident_name', 'phone', 'tags'].includes(props.column.field)
      }">
        <template v-if="props.column.field === 'actions'">
          <div class="dropdown dropdown-left dropdown-end dropdown-hover">
            <div tabindex="0" role="button" class="m-1 p-1 rounded-full hover:bg-gray-200 cursor-pointer">
              <svg class="w-6 h-6  text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 6h.01M12 12h.01M12 18h.01" />
              </svg>
            </div>
            <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow border-1 border-gray-200">
              <li><a @click="editRow(props.row)">Edit</a></li>
              <hr class="my-1 border-gray-300" />
              <li><a @click="deleteRow(props.row)">Delete</a></li>
              <li><a @click="viewRow(props.row)">View</a></li>
              <li><a @click="setRemarks(props.row)">Set Remarks</a></li>
            </ul>
          </div>
        </template>
        <span v-html="props.column.formatter
          ? props.column.formatter(props.row[props.column.field], props.row)
          : props.row[props.column.field]
          "></span>
      </span>
    </template>
  </vue-good-table>
  <RemarksModal ref="remarksModalRef" @remarks-saved="fetchResidents" />
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { VueGoodTable } from 'vue-good-table-next';
import RemarksModal from './RemarksModal.vue';
import { useResidents } from '../../../../composables/useResidents';

const { fetchResidents } = useResidents();
const remarksModalRef = ref(null);
const totalFilteredRows = ref(0);

const props = defineProps({
  residents: { type: Array, required: true }
});

/* ---------------------------
   Columns (your existing columns)
   --------------------------- */
const columns = [
  {
    label: 'No.',
    field: 'index',
    sortable: false,

  },
  {
    label: 'Full Name',
    field: 'resident_name',
    sortable: true,
    filterOptions: {
      enabled: true,
      placeholder: 'Search Name...'
    }
  },
  {
    label: 'Residency Status',
    field: 'residency_status',
    sortable: true,
    filterOptions: {
      enabled: true,
      placeholder: 'Select Status...',
      filterValue: '',
      filterDropdownItems: [
        { text: 'All', value: '' },
        { text: 'Permanent', value: 'Permanent' },
        { text: 'Temporary', value: 'Temporary' },
        { text: 'Boarder', value: 'Boarder' },
        { text: 'Tenant', value: 'Tenant' },
        { text: 'Informal Settler', value: 'Informal Settler' },
        { text: 'Other', value: 'Other' }
      ],
      filterDropdown: true
    },
    formatter: (value) => {
      if (value === 'Permanent') {
        return `<div class="badge badge-soft badge-success flex items-center gap-1">${value}</div>`;
      } else if (value === 'Temporary') {
        return `<div class="badge badge-soft badge-info flex items-center gap-1">${value}</div>`;
      } else if (value === 'Boarder') {
        return `<div class="badge badge-soft badge-warning flex items-center gap-1">${value}</div>`;
      } else if (value === 'Tenant') {
        return `<div class="badge badge-soft badge-primary flex items-center gap-1">${value}</div>`;
      } else if (value === 'Informal Settler') {
        return `<div class="badge badge-soft badge-error flex items-center gap-1">${value}</div>`;
      } else {
        return `<div class="badge badge-soft badge-ghost flex items-center gap-1">${value}</div>`;
      }
    }
  },
  {
    label: 'Gender',
    field: 'gender',
    sortable: true,
    filterOptions: {
      enabled: true,
      placeholder: 'Select Gender...',
      filterValue: '',
      filterDropdownItems: ['Male', 'Female'],
      filterDropdown: true
    }
  },
  {
    label: 'Age',
    field: 'age',
    sortable: true,
    filterOptions: { enabled: true, placeholder: 'Search Age...' }
  },
  {
    label: 'Civil Status',
    field: 'marital_status',
    sortable: true,
    filterOptions: {
      enabled: true,
      placeholder: 'Select Status...',
      filterValue: '',
      filterDropdownItems: ['Single', 'Married', 'Widowed', 'Separated'],
      filterDropdown: true
    }
  },
  {
    label: 'Sitio',
    field: 'sitio',
    sortable: true,
    filterOptions: { enabled: true, placeholder: 'Search Sitio...' }
  },
  {
    label: 'Remarks',
    field: 'tags',
    sortable: true,
    filterOptions: {
      enabled: true,
      placeholder: 'Filter Remarks...',
      filterDropdown: true,
      filterDropdownItems: [
        { text: 'All', value: '' },
        { text: 'Has Remarks', value: 'HAS_REMARKS' },
        { text: 'No Remarks', value: 'NO_REMARKS' }
      ],
      filterFn: (rowValue, filterValue) => {
        if (!filterValue) return true;
        const normalized = (rowValue ?? '').toString().trim().toLowerCase();
        const hasRemarks = normalized !== '' && normalized !== 'null' && normalized !== 'undefined';
        if (filterValue === 'HAS_REMARKS') return hasRemarks;
        if (filterValue === 'NO_REMARKS') return !hasRemarks;
        return true;
      }
    }
  }, {
    label: 'Actions',
    field: 'actions',
    sortable: false,
  }
];

/* ---------------------------
   computed rows (use this in table)
   --------------------------- */
const rows = computed(() =>
  (props.residents || []).map((r, index) => {
    const birthDate = r.dob ? new Date(r.dob) : null;
    let age = '';
    if (birthDate && !isNaN(birthDate)) {
      age = new Date().getFullYear() - birthDate.getFullYear();
      const monthDiff = new Date().getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < birthDate.getDate())) {
        age--;
      }
    }
    return { ...r, age, index: index + 1 };
  })
);

/* ---------------------------
   Column visibility state
   --------------------------- */
const visibleColumnFields = ref(columns.map(c => c.field));

const visibleColumns = computed(() => {
  const filtered = columns.filter(col => visibleColumnFields.value.includes(col.field));
  // if user accidentally unchecks all columns, show all columns instead to avoid empty table
  return filtered.length ? filtered : columns;
});

/* ---------------------------
   handle rows change (optional)
   --------------------------- */
const handleRowsChange = (params) => {
  // vue-good-table passes { currentRows } or similar; be defensive
  if (params && Array.isArray(params.currentRows)) {
    totalFilteredRows.value = params.currentRows.length;
  } else if (Array.isArray(params)) {
    totalFilteredRows.value = params.length;
  } else {
    totalFilteredRows.value = 0;
  }
};

onMounted(async() => {
  await fetchResidents();
});
function editRow(row) {
  console.log('Edit clicked:', row.resident_name);
  // open edit modal, etc.
}

function deleteRow(row) {
  console.log('Delete clicked:', row);
  // confirm then remove row, etc.
}

function viewRow(row) {
  console.log('View clicked:', row);
  // open view modal, etc.
}


const setRemarks = (row) => {
  remarksModalRef.value.open(row);
};

</script>

<style scoped>
.font-bold {
  font-weight: 900 !important;
}
</style>
