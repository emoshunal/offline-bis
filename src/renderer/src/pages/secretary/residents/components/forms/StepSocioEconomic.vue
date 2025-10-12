<template>
  <div>
    <h2 class="card-title mb-2">Socio-Economic Data</h2>
    <p class="text-sm text-gray-500 mb-6">
      Please provide the source of income and financial details of the resident.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="form-control">
        <label class="label"><span class="label-text">Source of Income</span></label>
        <input v-model="form.soi" type="text" class="input input-bordered" placeholder="e.g., Tricycle Driver" />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Gross Monthly Income (₱)</span></label>
        <input v-model="form.income" type="number" class="input input-bordered" placeholder="e.g., 15000" />
      </div>
    </div>

    <p class="text-xs text-gray-500 mt-6 text-center">
      Ensure that all resident information entered is accurate and complete.
    </p>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const form = inject('form')
</script>
