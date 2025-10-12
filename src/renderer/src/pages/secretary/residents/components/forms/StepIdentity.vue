<template>
  <div>
    <h2 class="card-title mb-2">Identity Information</h2>
    <p class="text-sm text-gray-500 mb-6">This section collects personal and demographic details.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="form-control">
        <label class="label"><span class="label-text">First Name</span></label>
        <input v-model="form.first_name" type="text" class="input input-bordered" placeholder="Enter given name" />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Middle Name</span></label>
        <input v-model="form.middle_name" type="text" class="input input-bordered" placeholder="Enter middle name" />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Last Name</span></label>
        <input v-model="form.last_name" type="text" class="input input-bordered" placeholder="Enter surname" />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Gender</span></label>
        <select v-model="form.gender" class="select select-bordered">
          <option disabled selected>Select gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Date of Birth</span></label>
        <input v-model="form.dob" type="date" class="input input-bordered" />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Place of Birth</span></label>
        <input v-model="form.pob" type="text" class="input input-bordered" placeholder="e.g., Quezon City" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const form = inject('form')
</script>
