<template>
  <div class="space-y-6">
    <!-- Resident Search -->
    <div>
      <label class="block mb-1 font-medium">Resident Name</label>
      <input
        type="text"
        v-model="search"
        placeholder="Type to search..."
        class="w-full border rounded p-2"
        @input="filterResidents"
      />
      <ul
        v-if="filtered.length"
        class="border rounded mt-1 max-h-40 overflow-y-auto bg-white"
      >
        <li
          v-for="resident in filtered"
          :key="resident.id"
          @click="selectResident(resident)"
          class="p-2 hover:bg-gray-100 cursor-pointer"
        >
          {{ resident.fullName }}
        </li>
      </ul>
    </div>

    <!-- Issued Clearances Table -->
    <div class="p-4 bg-white shadow-lg rounded-lg overflow-x-auto">
      <h2 class="text-xl font-semibold mb-4">Issued Clearances</h2>
      <table class="min-w-full table-auto border-collapse border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="border border-gray-300 px-4 py-2 text-left">#</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Resident Name</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Purpose</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Date Issued</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Issued By</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-50" v-for="clearance in clearances" :key="clearance.id">
            <td class="border border-gray-300 px-4 py-2">{{ clearance.id }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ clearance.resident }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ clearance.purpose }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ clearance.dateIssued }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ clearance.issuedBy }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <span
                :class="{
                  'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium': clearance.status === 'Issued',
                  'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium': clearance.status === 'Pending',
                }"
              >
                {{ clearance.status }}
              </span>
            </td>
            <td class="border border-gray-300 px-4 py-2 flex gap-2">
              <button class="text-blue-600 hover:underline">View</button>
              <button class="text-yellow-600 hover:underline">Edit</button>
              <button class="text-green-600 hover:underline">Print</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      selectedResident: null,
      residents: [
        { id: 1, fullName: "Juan Dela Cruz" },
        { id: 2, fullName: "Maria Santos" },
        { id: 3, fullName: "Pedro Reyes" },
        { id: 4, fullName: "Ana Lopez" },
        { id: 5, fullName: "Carlos Mendoza" },
      ],
      filtered: [],
      clearances: [
        { id: 1, resident: "Juan Dela Cruz", purpose: "Employment", dateIssued: "2025-09-13", issuedBy: "Admin", status: "Issued" },
        { id: 2, resident: "Maria Santos", purpose: "School", dateIssued: "2025-09-12", issuedBy: "Admin", status: "Issued" },
        { id: 3, resident: "Pedro Reyes", purpose: "Travel", dateIssued: "2025-09-11", issuedBy: "Admin", status: "Pending" },
        { id: 4, resident: "Ana Lopez", purpose: "Business", dateIssued: "2025-09-10", issuedBy: "Admin", status: "Issued" },
        { id: 5, resident: "Carlos Mendoza", purpose: "Employment", dateIssued: "2025-09-09", issuedBy: "Admin", status: "Pending" },
      ],
    };
  },
  methods: {
    filterResidents() {
      const query = this.search.toLowerCase();
      this.filtered = this.residents
        .filter((r) => r.fullName.toLowerCase().includes(query))
        .slice(0, 20);
    },
    selectResident(resident) {
      this.selectedResident = resident;
      this.search = resident.fullName;
      this.filtered = [];
      // populate other fields if needed
    },
  },
};
</script>
