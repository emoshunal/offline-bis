<template>
  <div class="py-4">
    <h2 class="text-lg font-semibold mb-4">Households Overview</h2>

    <vue-good-table
      :columns="columns"
      :rows="groupedRows"
      :group-options="{
        enabled: true,
        collapsable: true,
        headerPosition: 'top'
      }"
      :line-numbers="true"
      :pagination-options="{
        enabled: true,
        perPage: 50
      }"
      styleClass="vgt-table bordered striped condensed"
    >
      <template #table-row="props">
        <template v-if="props.column.field === 'actions'">
          <button
            class="text-blue-600 hover:underline"
            @click="viewDetails(props.row)"
          >
            View
          </button>
        </template>
        <template v-else>
          {{ props.formattedRow[props.column.field] }}
        </template>
      </template>
    </vue-good-table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { VueGoodTable } from 'vue-good-table-next'
import { useResidents } from '../../../../composables/useResidents'

const { fetchHouseholds, households } = useResidents()

const columns = [
  { label: 'Family ID', field: 'family_id', sortable: true },
  { label: 'Resident Name', field: 'resident_name', sortable: true, filterOptions: { enabled: true, placeholder: 'Search Name...' } },
  { label: 'Gender', field: 'gender' },
  { label: 'Age', field: 'age' },
  { label: 'Relationship (to Head)', field: 'relationship_to_household_head' },
  { label: 'Actions', field: 'actions' }
]

// ✅ Create nested group rows
const groupedRows = computed(() => {
  const list = households.value || []
  const rows = []

  list.forEach((household) => {
    if (!Array.isArray(household.families)) return

    const familyChildren = []

    household.families.forEach((family) => {
      if (!Array.isArray(family.residents)) return

      // push each resident as a row
      family.residents.forEach((resident) => {
        familyChildren.push({
          family_id: family.family_id,
          resident_name: `${resident.first_name} ${resident.middle_name} ${resident.last_name}`,
          gender: resident.gender,
          age: resident.age,
          relationship_to_household_head: resident.relationship_to_household_head
        })
      })
    })

    // household summary/header row
    rows.push({
      mode: 'span', // group header row
      label: `🏠 Household ${household.household_id} (${household.housing_type} / ${household.ownership_status})`,
      children: familyChildren
    })
  })

  return rows
})

const viewDetails = (row) => {
  alert(`Viewing details for ${row.resident_name}`)
}

onMounted(fetchHouseholds)
</script>

<style scoped>
.vgt-table {
  font-size: 14px;
}
</style>
