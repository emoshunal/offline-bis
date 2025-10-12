<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold flex items-center gap-2">
        <svg
          class="w-8 h-8 text-gray-800 dark:text-white"
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
            d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
          />
        </svg>
        Household #{{ household?.household_id }}
      </h2>
      <router-link to="/households" class="btn btn-sm btn-outline btn-accent"> ← Back </router-link>
    </div>

    <!-- Household Info -->
    <div class="card bg-base-100 shadow-md border border-gray-200">
      <div class="card-body grid md:grid-cols-3 gap-4 text-sm">
        <div>
          <span class="font-medium text-gray-600">Housing Type:</span>
          <p class="text-gray-800">{{ household?.housing_type || 'N/A' }}</p>
        </div>
        <div>
          <span class="font-medium text-gray-600">Ownership Status:</span>
          <p class="text-gray-800">{{ household?.ownership_status || 'N/A' }}</p>
        </div>
        <div>
          <span class="font-medium text-gray-600">Head of Household:</span>
          <p class="text-gray-800">
            {{ getHouseholdHeadName() || 'Unknown' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Families -->
    <div class="space-y-4">
      <h3 class="text-xl font-semibold text-gray-800">Families in this Household</h3>

      <div
        v-for="family in household?.families || []"
        :key="family.family_id"
        class="collapse collapse-arrow bg-base-100 border border-gray-200 shadow-sm"
      >
        <input type="checkbox" />
        <div class="collapse-title text-lg font-medium flex items-center justify-between">
          <div class="flex items-center gap-2">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
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
                stroke-width="2"
                d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
              />
            </svg>
            Family #{{ family.family_id }}
            <span class="text-sm text-gray-500">
              Family Head: {{ getFamilyHeadName(family) || 'N/A' }}
            </span>
          </div>
        </div>

        <div class="collapse-content">
          <div class="overflow-x-auto mt-2">
            <table class="table table-zebra w-full text-sm">
              <thead>
                <tr class="bg-base-200 text-gray-600 uppercase text-xs">
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Relationship (to HH Head)</th>
                  <th>Relationship (to Family Head)</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="res in family.residents" :key="res.resident_id">
                  <td>{{ res.first_name }} {{ res.middle_name }} {{ res.last_name }}</td>
                  <td>{{ res.gender }}</td>
                  <td>{{ computeAge(res.dob) }}</td>
                  <td>{{ res.relationship_to_household_head || '-' }}</td>
                  <td>{{ res.relationship_to_family_head || '-' }}</td>
                  <td>
                    <span
                      class="badge"
                      :class="{
                        'badge-primary': isHouseholdHead(res),
                        'badge-secondary': isFamilyHead(res),
                        'badge-neutral': !isHouseholdHead(res) && !isFamilyHead(res)
                      }"
                    >
                      {{ getRole(res, family) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useResidents } from '../../../../composables/useResidents'

const route = useRoute()
const router = useRouter()
const { getHouseholdById } = useResidents()

const household = ref(null)

onMounted(async () => {
  const id = route.query.id
  if (!id) {
    router.push('/households')
    return
  }

  const result = await getHouseholdById(id)
  household.value = result
  console.log('Fetched household:', result)
})

// ✅ Helpers
const computeAge = (dob) => {
  if (!dob) return ''
  const birth = new Date(dob)
  if (isNaN(birth)) return ''
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

const getRole = (res, family) => {
  if (res.resident_id === household.value.household_head_id) return 'Household Head'
  if (res.resident_id === family.family_head_id) return 'Family Head'
  return 'Member'
}

const isHouseholdHead = (res) => res.resident_id === household.value.household_head_id
const isFamilyHead = (res) =>
  household.value?.families?.some((f) => f.family_head_id === res.resident_id)

const getHouseholdHeadName = () => {
  for (const f of household.value?.families || []) {
    for (const r of f.residents || []) {
      if (r.resident_id === household.value.household_head_id) {
        return `${r.first_name} ${r.middle_name ?? ''} ${r.last_name}`.trim()
      }
    }
  }
  return null
}

const getFamilyHeadName = (family) => {
  const head = family.residents?.find((r) => r.resident_id === family.family_head_id)
  return head ? `${head.first_name} ${head.middle_name ?? ''} ${head.last_name}`.trim() : null
}
</script>

<style scoped>
.table th,
.table td {
  white-space: nowrap;
}
</style>
