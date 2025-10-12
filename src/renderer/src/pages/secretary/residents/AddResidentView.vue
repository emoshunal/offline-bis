<template>
  <div class="flex min-h-[80vh] pt-8">
    <!-- Sidebar -->
    <aside class="w-64 border-r hidden lg:flex xl:flex border-gray-200">
      <ul class="menu p-4 gap-2" style="font-family: satoshi;">
        <li v-for="(s, i) in steps" :key="i">
          <button
            :class="[
              'w-full text-left px-3 py-2 rounded-lg transition',
              currentStep === i ? 'bg-gray-200 font-semibold text-gray-900' : 'hover:bg-gray-50 text-gray-600'
            ]"
            @click="goToStep(i)"
          >
            {{ s.label }}
          </button>
        </li>
      </ul>
    </aside>

    <!-- Main Form -->
    <main class="flex-1 p-8 overflow-y-auto">
      <h1 class="text-2xl font-bold mb-2">Add New Resident</h1>
      <p class="text-sm mb-6 text-gray-600">
        Fill out this form to register a new resident in the Barangay Information System.
      </p>

      <ResidentWizard
        :current-step="currentStep"
        @next="nextStep"
        @prev="prevStep"
        @go-to="goToStep"
      />
    </main>
  </div>
</template>

<script setup>
import { ref , provide} from 'vue'
import ResidentWizard from './components/forms/ResidenWizard.vue'
import { form } from '../../../composables/useResidentForm'
const currentStep = ref(0)

const steps = [
  { label: 'Basic Information' },
  { label: 'Contact and Address Details' },
  { label: 'Household Information' },
  { label: 'Socio-Economic Data' },
]

provide('form', form)
const nextStep = () => {
  if (currentStep.value < steps.length - 1) currentStep.value++
}
const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--
}
const goToStep = (index) => {
  currentStep.value = index
}
</script>
