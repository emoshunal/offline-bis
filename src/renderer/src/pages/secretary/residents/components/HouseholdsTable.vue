<template>
  <div class="py-4">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-end">
        <label
          class="input flex items-center gap-2 border border-gray-300 rounded-md px-2 py-1 text-sm focus-within:ring focus-within:ring-blue-300"
        >
          <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            v-model="searchQuery"
            class="grow focus:outline-none"
            placeholder="Search table"
          />
          <kbd class="kbd kbd-sm">⌘</kbd>
          <kbd class="kbd kbd-sm">K</kbd>
        </label>
      </div>
      <div class="flex gap-2">
        <button
          @click="downloadExcel"
          class="px-4 py-2 flex gap-2 btn btn-sm items-center justify-center btn bg-[#03C755] text-white border-[#00b544]"
        >
          <svg
            class="w-5 h-5 text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M6 16v-3h.375a.626.626 0 0 1 .625.626v1.749a.626.626 0 0 1-.626.625H6Zm6-2.5a.5.5 0 1 1 1 0v2a.5.5 0 0 1-1 0v-2Z"
            />
            <path
              fill-rule="evenodd"
              d="M11 7V2h7a2 2 0 0 1 2 2v5h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2H3a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h6a2 2 0 0 0 2-2Zm7.683 6.006 1.335-.024-.037-2-1.327.024a2.647 2.647 0 0 0-2.636 2.647v1.706a2.647 2.647 0 0 0 2.647 2.647H20v-2h-1.335a.647.647 0 0 1-.647-.647v-1.706a.647.647 0 0 1 .647-.647h.018ZM5 11a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.376A2.626 2.626 0 0 0 9 15.375v-1.75A2.626 2.626 0 0 0 6.375 11H5Zm7.5 0a2.5 2.5 0 0 0-2.5 2.5v2a2.5 2.5 0 0 0 5 0v-2a2.5 2.5 0 0 0-2.5-2.5Z"
              clip-rule="evenodd"
            />
            <path d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Z" />
          </svg>
          Excel
        </button>

        <button
          @click="downloadWord"
          class="px-4 py-2 bg-blue-600 flex gap-2 items-center btn btn-sm justify-center text-white rounded hover:bg-blue-700"
        >
          <svg
            class="w-5 h-5 text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 10V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v6M5 19v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1M10 3v4a1 1 0 0 1-1 1H5m14 9.006h-.335a1.647 1.647 0 0 1-1.647-1.647v-1.706a1.647 1.647 0 0 1 1.647-1.647L19 12M5 12v5h1.375A1.626 1.626 0 0 0 8 15.375v-1.75A1.626 1.626 0 0 0 6.375 12H5Zm9 1.5v2a1.5 1.5 0 0 1-1.5 1.5v0a1.5 1.5 0 0 1-1.5-1.5v-2a1.5 1.5 0 0 1 1.5-1.5v0a1.5 1.5 0 0 1 1.5 1.5Z"
            />
          </svg>
          Word
        </button>
      </div>
    </div>

    <vue-good-table
      :columns="columns"
      :rows="filteredRows"
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
          <button v-if="props.row.role ==='Household Head'" @click="viewEachHousehold(props.row.household_id)" class="btn btn-xs btn-info flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7
                         -2.268 7-7.542 7-8.268-2.943-9.542-7z"
              />
            </svg>
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
import { useRouter } from 'vue-router'
import { VueGoodTable } from 'vue-good-table-next'
import { useResidents } from '../../../../composables/useResidents'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType } from 'docx'
import label from 'daisyui/components/label'

const router = useRouter()
const { fetchHouseholds, households } = useResidents()
const searchQuery = ref('')

const columns = [
  { label: 'Family ID', field: 'family_id', sortable: true },
  {
    label: 'Resident Name',
    field: 'resident_name',
    sortable: true
  },
  { label: 'Role', field: 'role', sortable: true },
  { label: 'Gender', field: 'gender' },
  { label: 'Age', field: 'age' },
  { label: 'Actions', field: 'actions' }
]

const groupedRows = computed(() => {
  const list = households.value || []
  const rows = []
  const computeAge = (dob) => {
    if (!dob) return '' // no date → blank age
    const birthDate = new Date(dob)
    if (isNaN(birthDate)) return '' // invalid date
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }
  list.forEach((household) => {
    if (!Array.isArray(household.families)) return

    const familyChildren = []

    household.families.forEach((family) => {
      if (!Array.isArray(family.residents)) return

      family.residents.forEach((resident) => {
        
        // Determine role
        let role = 'Member'
        if (resident.resident_id === household.household_head_id) {
          role = 'Household Head'
        } else if (resident.resident_id === family.family_head_id) {
          role = 'Family Head'
        }

        familyChildren.push({
          household_id: household.household_id,
          family_id: family.family_id,
          resident_name:
            `${resident.first_name} ${resident.middle_name ?? ''} ${resident.last_name}`.trim(),
          gender: resident.gender,
          age: computeAge(resident.dob),
          relationship_to_household_head: resident.relationship_to_household_head,
          relationship_to_family_head: resident.relationship_to_family_head,
          role // 👈 added role field
        })
      })
    })

    // Push one grouped header row per household
    rows.push({
      mode: 'span',
      label: `🏠 Household ${household.household_id} (${household.housing_type} / ${household.ownership_status})`,
      children: familyChildren
    })
  })

  return rows
})

const filteredRows = computed(() => {
  if (!searchQuery.value.trim()) return groupedRows.value

  const query = searchQuery.value.toLowerCase()

  return groupedRows.value
    .map((group) => {
      const filteredChildren = group.children.filter((row) =>
        Object.values(row).some((val) => String(val).toLowerCase().includes(query))
      )
      if (filteredChildren.length > 0) {
        return { ...group, children: filteredChildren }
      }
      return null
    })
    .filter(Boolean)
})

const viewEachHousehold = (row) => {
  router.push({
    path: '/view-each-household',
    query: { id: row},
  })
}
function downloadExcel() {
  if (!groupedRows.value.length) return alert('No data to export.')

  const ws = XLSX.utils.json_to_sheet(groupedRows.value)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'ResidentsData')

  const filename = `households_${new Date().toISOString().split('T')[0]}.xlsx`
  XLSX.writeFile(wb, filename)
}

async function downloadWord() {
  if (!groupedRows.value.length) return alert('No data to export.')

  // Build table headers
  const headerCells = columns.map(
    (col) =>
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: col.label, bold: true })] })],
        width: { size: 20, type: WidthType.PERCENTAGE }
      })
  )

  // Build table rows
  const dataRows = groupedRows.value.map(
    (row) =>
      new TableRow({
        children: columns.map(
          (col) =>
            new TableCell({
              children: [new Paragraph(String(row[col.field] || ''))]
            })
        )
      })
  )

  // Build the document
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [new TextRun({ text: 'Households Report', bold: true, size: 28 })],
            spacing: { after: 200 }
          }),
          new Table({
            rows: [new TableRow({ children: headerCells }), ...dataRows],
            width: { size: 100, type: WidthType.PERCENTAGE }
          })
        ]
      }
    ]
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, `households_${new Date().toISOString().split('T')[0]}.docx`)
}

onMounted(fetchHouseholds)
</script>

<style scoped>
.vgt-table {
  font-size: 14px;
}
</style>
