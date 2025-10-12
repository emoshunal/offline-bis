<template>
  <div class="bg-white border border-gray-200 rounded-2xl w-full xl:w-3/4 p-6 shadow-sm">
    <component :is="steps[currentStep].component" />

    <!-- Navigation -->
    <div class="flex justify-between mt-8 pt-4 border-t border-gray-200">
      <button
        class="btn btn-outline"
        :disabled="currentStep === 0"
        @click="$emit('prev')"
      >
        Previous
      </button>

      <button
        v-if="currentStep < steps.length - 1"
        class="btn btn-accent"
        @click="$emit('next')"
      >
        Next
      </button>

      <button
        v-else
        class="btn btn-success"
        @click="submitForm"
      >
        Save Resident Record
      </button>
    </div>
  </div>
</template>

<script setup>
import { toRaw } from 'vue'
import StepIdentity from './StepIdentity.vue'
import StepAddress from './StepAddress.vue'
import StepHousehold from './StepHousehold.vue'
import StepSocioEconomic from './StepSocioEconomic.vue'
import { inject } from 'vue'

const form = inject('form')

defineProps({
  currentStep: Number
})

const steps = [
  { label: 'Basic Information', component: StepIdentity },
  { label: 'Contact and Address Details', component: StepAddress },
  { label: 'Household Information', component: StepHousehold },
  { label: 'Socio-Economic Data', component: StepSocioEconomic }
]

const submitForm = async() => {
  console.table(form)
  try{
    const plainForm = toRaw(form)
    const result = await window.api.addResident(plainForm)
    if(result.success){
      alert(`✅ Resident ${form.first_name} ${form.last_name} added successfully!`)
    }else{
       alert('⚠️ Failed: ' + result.error)
       console.error(result.error)
    }
  }catch(error){
    console.error(error);
    alert('❌ Unexpected error occurred.')
  }
}
</script>
