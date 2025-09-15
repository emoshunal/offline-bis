<template>
    <div class="residents-view">
        <h1>Residents</h1>
        <div class="actions">
            <input v-model="search" placeholder="Search residents..." />
            <button @click="openAddModal">Add Resident</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Room</th>
                    <th>Contact</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="resident in filteredResidents" :key="resident.id">
                    <td>{{ resident.name }}</td>
                    <td>{{ resident.room }}</td>
                    <td>{{ resident.contact }}</td>
                    <td>
                        <button @click="editResident(resident)">Edit</button>
                        <button @click="deleteResident(resident.id)">Delete</button>
                    </td>
                </tr>
                <tr v-if="filteredResidents.length === 0">
                    <td colspan="4">No residents found.</td>
                </tr>
            </tbody>
        </table>

        <!-- Add/Edit Modal -->
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <h2>{{ editingResident ? 'Edit Resident' : 'Add Resident' }}</h2>
                <form @submit.prevent="saveResident">
                    <label>
                        Name:
                        <input v-model="form.name" required />
                    </label>
                    <label>
                        Room:
                        <input v-model="form.room" required />
                    </label>
                    <label>
                        Contact:
                        <input v-model="form.contact" required />
                    </label>
                    <div class="modal-actions">
                        <button type="submit">Save</button>
                        <button type="button" @click="closeModal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const residents = ref([
    { id: 1, name: 'Alice Smith', room: '101', contact: '555-1234' },
    { id: 2, name: 'Bob Johnson', room: '102', contact: '555-5678' },
])

const search = ref('')
const showModal = ref(false)
const editingResident = ref(null)
const form = ref({ name: '', room: '', contact: '' })

const filteredResidents = computed(() =>
    residents.value.filter(r =>
        r.name.toLowerCase().includes(search.value.toLowerCase()) ||
        r.room.toLowerCase().includes(search.value.toLowerCase()) ||
        r.contact.toLowerCase().includes(search.value.toLowerCase())
    )
)

function openAddModal() {
    editingResident.value = null
    form.value = { name: '', room: '', contact: '' }
    showModal.value = true
}

function editResident(resident) {
    editingResident.value = resident
    form.value = { ...resident }
    showModal.value = true
}

function saveResident() {
    if (editingResident.value) {
        Object.assign(editingResident.value, form.value)
    } else {
        residents.value.push({
            id: Date.now(),
            ...form.value
        })
    }
    closeModal()
}

function deleteResident(id) {
    residents.value = residents.value.filter(r => r.id !== id)
}

function closeModal() {
    showModal.value = false
}
</script>

<style scoped>
.residents-view {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
}
.actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}
table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
}
th, td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
}
.modal {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    min-width: 300px;
}
.modal-actions {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
}
</style>