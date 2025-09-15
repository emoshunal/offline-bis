<template>
  <div class="flex flex-row gap-4">
    <!-- Quick Action Sidebar -->
    <div
      :class="['bg-gray-50 p-4 shadow-lg rounded-lg transition-all duration-300', collapsed ? 'w-16' : 'w-64']"
    >
   
      <!-- Toggle Button -->
      <button
        @click="collapsed = !collapsed"
        class="mb-6 flex items-center justify-center w-8 h-8 transition"
      >
        <svg
          v-if="!collapsed"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Full Buttons -->
      <div v-if="!collapsed" class="flex flex-col gap-2">
        <button
          class="p-2 flex items-center gap-3 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.121 17.804A4 4 0 0112 15a4 4 0 016.879 2.804M12 11a4 4 0 100-8 4 4 0 000 8z"
            />
          </svg>
          Add Resident
        </button>

        <button
          class="p-2 flex items-center gap-3 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12h6m-3-3v6M4 6h16M4 18h16"
            />
          </svg>
          Issue Certificate
        </button>

        <button
          class="p-2 flex items-center gap-3 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12h6m-3-3v6M4 6h16M4 18h16"
            />
          </svg>
          Log Blotter Case
        </button>

      </div>

      <!-- Collapsed Icons Only -->
      <div v-else class="flex flex-col gap-6 mt-4 items-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.121 17.804A4 4 0 0112 15a4 4 0 016.879 2.804M12 11a4 4 0 100-8 4 4 0 000 8z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-3-3v6" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-yellow-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-3-3v6" />
        </svg>

      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const collapsed = ref(false);
    return { collapsed };
  },
};
</script>
