<template>

  <vue-good-table styleClass="vgt-table bordered" :columns="columns" :rows="residents" :fixed-header="true"
        @on-rows-change="handleRowsChange"
        :pagination-options="{ enabled: true, perPage: 10 }" :search-options="{ enabled: true }" class="rounded-lg">
        <template #table-row="props" styleClass="vgt-table bordered">
              <span
    :class="{
      'font-bold text-base': ['resident_name'].includes(props.column.field), 
      'text-sm text-red-600': props.column.field === 'tags', 
      'text-base': !['resident_name', 'phone', 'tags'].includes(props.column.field) 
    }"
  >
                  
                   
              {{ props.formattedRow[props.column.field] }}
            </span>
        </template>
    </vue-good-table>
</template>

<script setup>
import { computed, ref } from 'vue';
import { VueGoodTable } from 'vue-good-table-next';

const totalFilteredRows = ref(0);




const props = defineProps({
  residents: { type: Array, required: true }
});

const columns = [
  {
    label: 'Full Name',
    field: 'resident_name',
    sortable: true,
    filterOptions: { enabled: true }
  },
  {
    label: 'Gender',
    field: 'gender',
    sortable: true,
    filterOptions: {
      enabled: true,
      filterValue: '',
      filterDropdownItems: ['Male', 'Female'],
      filterDropdown: true
    }
  },
  {
    label: 'Age',
    field: 'age',
    sortable: true,
    filterOptions: { enabled: true }
  },
  {
    label: 'Contact Number',
    field: 'phone',
  },
  {
    label: 'Civil Status',
    field: 'marital_status',
    sortable: true,
    filterOptions: {
      enabled: true,
      filterValue: '',
      filterDropdownItems: ['Single', 'Married', 'Widowed', 'Separated'],
      filterDropdown: true
    }
  },{
    label: 'Sitio',
    field: 'sitio',
    sortable: true,
    filterOptions: { enabled: true }
  },
{
  label: 'Remarks',
  field: 'tags',
  sortable: true,
  filterOptions: {
    enabled: true,
    filterDropdown: true,
    filterDropdownItems: [
      { text: 'All', value: '' },
      { text: 'Has Remarks', value: 'HAS_REMARKS' },
      { text: 'No Remarks', value: 'NO_REMARKS' }
    ],
    filterFn: (rowValue, filterValue, row) => {
      // ✅ Always show all rows when "All" is selected
      if (!filterValue) return true;

      const normalized = (rowValue ?? '').toString().trim().toLowerCase();
      const hasRemarks = normalized !== '' && normalized !== 'null' && normalized !== 'undefined';

      if (filterValue === 'HAS_REMARKS') {
        return hasRemarks;
      }

      if (filterValue === 'NO_REMARKS') {
        return !hasRemarks;
      }

      return true; // fallback (shouldn't be hit)
    }
  }
}


];

const rows = computed(() =>
  (props.residents || []).map(r => {
    const birthDate = new Date(r.dob);
    let age = new Date().getFullYear() - birthDate.getFullYear();
    const m = new Date().getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && new Date().getDate() < birthDate.getDate())) {
      age--;
    }
    return { ...r, age };
  })
);

</script>
<style scoped>
.font-bold {
  font-weight: 900 !important;
}
</style>