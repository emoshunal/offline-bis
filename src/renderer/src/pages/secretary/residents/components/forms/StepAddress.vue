<template>
  <div>
    <h2 class="card-title mb-2">Contact and Address Details</h2>
    <p class="text-sm text-gray-500 mb-6">
      Provide the complete current residential address of the resident.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="form-control">
        <label class="label"><span class="label-text">Residency Status</span></label>
        <select v-model="form.residency_status" class="select select-bordered">
          <option disabled value="">Select status</option>
          <option>Permanent Resident</option>
          <option>Temporary Resident</option>
          <option>Boarder/Lodger</option>
          <option>Tenant</option>
          <option>Informal Settler</option>
          <option>Other</option>
        </select>
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Resident Since</span></label>
        <input v-model="form.resident_since" type="date" class="input input-bordered" />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">House No. / Street</span></label>
        <input v-model="form.house_no_st" type="text" class="input input-bordered" placeholder="e.g., 123 Mabini St." />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Purok / Sitio</span></label>
        <input v-model="form.sitio" type="text" class="input input-bordered" placeholder="e.g., Purok 5" />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Phone Number</span></label>
        <input v-model="form.phone" type="text" class="input input-bordered" placeholder="e.g., 09123456789" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const form = inject('form')
</script>
