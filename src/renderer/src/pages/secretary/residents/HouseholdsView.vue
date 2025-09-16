<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold mb-4">Household Profiling</h1>

    <!-- Search & Add -->
    <div class="flex justify-between items-center mb-4">
      <input
        v-model="search"
        type="text"
        placeholder="Search household..."
        class="input input-bordered w-1/3"
      />
      <button class="btn btn-primary" @click="addHousehold">
        Add Household
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Head of Household</th>
            <th>Members</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="household in filteredHouseholds"
            :key="household.id"
            class="hover"
          >
            <td>{{ household.id }}</td>
            <td>{{ household.head }}</td>
            <td>{{ household.members }}</td>
            <td>{{ household.address }}</td>
            <td>{{ household.contact }}</td>
            <td>
              <span
                :class="household.status === 'Active' ? 'badge badge-success' : 'badge badge-warning'"
              >
                {{ household.status }}
              </span>
            </td>
            <td class="space-x-2">
              <button class="btn btn-sm btn-info" @click="viewHousehold(household)">
                View
              </button>
              <button class="btn btn-sm btn-warning" @click="editHousehold(household)">
                Edit
              </button>
              <button class="btn btn-sm btn-error" @click="deleteHousehold(household.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-end mt-4">
      <button class="btn btn-sm" @click="prevPage" :disabled="page === 1">Prev</button>
      <span class="mx-2">{{ page }} / {{ totalPages }}</span>
      <button class="btn btn-sm" @click="nextPage" :disabled="page === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Sample household data
const households = ref([
  { id: 1, head: "Juan Dela Cruz", members: 5, address: "123 Barangay St.", contact: "09123456789", status: "Active" },
  { id: 2, head: "Maria Santos", members: 4, address: "456 Barangay St.", contact: "09234567890", status: "Active" },
  { id: 3, head: "Pedro Reyes", members: 6, address: "789 Barangay St.", contact: "09345678901", status: "Inactive" },
  // Add more sample data as needed
]);

const search = ref("");
const page = ref(1);
const perPage = 5;

const filteredHouseholds = computed(() => {
  const filtered = households.value.filter(h =>
    h.head.toLowerCase().includes(search.value.toLowerCase()) ||
    h.address.toLowerCase().includes(search.value.toLowerCase())
  );
  const start = (page.value - 1) * perPage;
  return filtered.slice(start, start + perPage);
});

const totalPages = computed(() => {
  return Math.ceil(
    households.value.filter(h =>
      h.head.toLowerCase().includes(search.value.toLowerCase()) ||
      h.address.toLowerCase().includes(search.value.toLowerCase())
    ).length / perPage
  );
});

// Actions
function addHousehold() {
  alert("Add household form here");
}

function viewHousehold(household) {
  alert(`Viewing household of ${household.head}`);
}

function editHousehold(household) {
  alert(`Editing household of ${household.head}`);
}

function deleteHousehold(id) {
  if (confirm("Are you sure you want to delete this household?")) {
    households.value = households.value.filter(h => h.id !== id);
  }
}

// Pagination
function nextPage() {
  if (page.value < totalPages.value) page.value++;
}

function prevPage() {
  if (page.value > 1) page.value--;
}
</script>

<style scoped>
.table-zebra tbody tr:nth-child(odd) {
  background-color: #f9fafb;
}
</style>
