<template>
  <div>
    <h2 class="card-title mb-2">Household Information</h2>
    <p class="text-sm text-gray-500 mb-6">
      Please provide household and family details of the resident.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="form-control">
        <label class="label"><span class="label-text">Household Type</span></label>
        <select v-model="form.household_type" class="select select-bordered">
          <option disabled value="">Select type</option>
          <option>Head</option>
          <option>Member</option>
        </select>
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Household Head Name</span></label>
        <input v-model="form.household_head_name" type="text" class="input input-bordered" placeholder="Enter name" />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Ownership Status</span></label>
        <select v-model="form.ownership_status" class="select select-bordered">
          <option disabled value="">Select ownership</option>
          <option>Owned</option>
          <option>Owned - Amortized</option>
          <option>Renting</option>
          <option>Rent-Free (with consent)</option>
          <option>Informal Settler</option>
          <option>Government Housing</option>
          <option>Shared Ownership</option>
          <option>Institution-Owned</option>
        </select>
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Relationship (Household)</span></label>
        <select v-model="form.relationship_to_household_head" class="select select-bordered">
          <option disabled value="">Select relationship</option>
          <option>Child</option>
          <option>Sibling</option>
          <option>Spouse</option>
          <option>Parent</option>
          <option>Relative</option>
          <option>Other</option>
        </select>
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Family Type</span></label>
        <select v-model="form.family_type" class="select select-bordered">
          <option disabled value="">Select type</option>
          <option>Head</option>
          <option>Member</option>
        </select>
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Family Head Name</span></label>
        <input v-model="form.family_head_name" type="text" class="input input-bordered" placeholder="Enter name" />
      </div>

      <div class="form-control">
        <label class="label"><span class="label-text">Relationship (Family)</span></label>
        <select v-model="form.relationship_to_family_head" class="select select-bordered">
          <option disabled value="">Select relationship</option>
          <option>Child</option>
          <option>Sibling</option>
          <option>Spouse</option>
          <option>Parent</option>
          <option>Relative</option>
          <option>Other</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const form = inject('form')
</script>
