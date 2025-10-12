<template>
  <div class="min-h-screen bg-base-200 py-10 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold text-accent flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg"
               class="w-8 h-8"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
               stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M5.121 17.804A4 4 0 019 15h6a4 4 0 013.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Resident Information
        </h1>
        <button class="btn btn-outline btn-sm" @click="$router.back()">← Back</button>
      </div>

      <!-- Card -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-4">{{ resident.resident_name }}</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <template v-for="(value, key) in filteredResident" :key="key">
              <div class="flex flex-col border-l-4 border-accent pl-3 py-2 bg-base-200 rounded-md">
                <span class="text-sm text-gray-500 font-semibold uppercase">{{ formatLabel(key) }}</span>
                <span class="text-lg font-medium">{{ value }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Tags -->
      <div v-if="resident.tags" class="mt-6">
        <div class="card bg-accent text-accent-content shadow-md">
          <div class="card-body">
            <h3 class="card-title text-lg">Tags</h3>
            <div class="badge badge-outline bg-white text-accent font-semibold">
              {{ resident.tags }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const rawData = route.query.data ? JSON.parse(decodeURIComponent(route.query.data)) : {}

const resident = rawData || {}

// ✅ Fields to exclude from display
const excludeFields = [
  'index',
  'vgt_id',
  'originalIndex',
  'household_id',
  'family_id'
]

// ✅ Filter out null, empty, or excluded fields
const filteredResident = computed(() => {
  const obj = {}
  for (const [key, value] of Object.entries(resident)) {
    if (
      value !== null &&
      value !== undefined &&
      value !== '' &&
      !excludeFields.includes(key)
    ) {
      obj[key] = value
    }
  }
  return obj
})

// ✅ Format labels for display
const formatLabel = (key) => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
</script>
