<template>
    <div class="pt-8">
        <div class="breadcrumbs text-sm pb-8">
            <ul>
                <li style="font-family: satoshi;">
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="h-4 w-4 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                        Home
                    </a>
                </li>
                <li style="font-family: satoshi;">
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="h-4 w-4 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                        Residents
                    </a>
                </li>
                <li style="font-family: satoshi;">
                    <span class="inline-flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="h-4 w-4 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                            </path>
                        </svg>
                        Lists
                    </span>
                </li>
            </ul>
        </div>
        <div class="my-2 flex justify-between items-center">
            <button class="btn btn-accent btn-circle"><svg class="w-4 h-4 text-gray-800 dark:text-white"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 12h14m-7 7V5" />
                </svg>
            </button>
            <div class="flex justify-center items-center gap-4">

                <label class="input">
                    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
                            stroke="currentColor">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" class="grow" placeholder="Search" />
                    <kbd class="kbd kbd-sm">⌘</kbd>
                    <kbd class="kbd kbd-sm">K</kbd>
                </label>
                <button class="btn btn-circle">
                    <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                            d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
                    </svg>

                </button>

            </div>

        </div>
        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table class="table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Mobile</th>
                        <th>Civil Status</th>
                        <th>Purok</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="resident in filteredResidents" :key="resident.id">
                        <td>{{ resident.lastName + ", " + resident.firstName + " " + resident.middleName + " " +
                            resident.suffix
                        }}</td>
                        <td>{{ resident.gender }}</td>
                        <td>{{ resident.age }}</td>
                        <td>{{ resident.mobile }}</td>
                        <td>{{ resident.civilStatus }}</td>
                        <td>{{ resident.purok }}</td>
                        <td>
                            <div class="dropdown dropdown-hover">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                    viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                        d="M12 6h.01M12 12h.01M12 18h.01" />
                                </svg>

                                <ul tabindex="0"
                                    class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li><a>View</a></li>
                                    <li><a>Update</a></li>
                                    <li><a>Remove</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="filteredResidents.length === 0">
                        <td colspan="4">No residents found.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-center items-center gap-2 mt-6">
            <!-- Previous Button -->
            <button class="btn btn-outline btn-sm" :disabled="currentPage === 1"
                @click="$emit('update:currentPage', currentPage - 1)">
                «
            </button>

            <!-- Numbered Buttons -->
            <button v-for="page in totalPages" :key="page" class="btn btn-sm" :class="{
                'btn-primary': page === currentPage,
                'btn-outline': page !== currentPage
            }" @click="$emit('update:currentPage', page)">
                {{ page }}
            </button>

            <!-- Next Button -->
            <button class="btn btn-outline btn-sm" :disabled="currentPage === totalPages"
                @click="$emit('update:currentPage', currentPage + 1)">
                »
            </button>
        </div>

        <!-- Add/Edit Modal -->
        <!-- <div v-if="showModal" class="modal">
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
        </div> -->
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const residents = ref([
    {
        id: 1,
        residentId: 'RES-2025-0001',
        firstName: 'Juan',
        middleName: 'Dela',
        lastName: 'Cruz',
        suffix: 'Jr.',
        gender: 'Male',
        dateOfBirth: '1990-03-15',
        age: 35,
        civilStatus: 'Married',
        nationality: 'Filipino',
        religion: 'Roman Catholic',
        mobile: '09171234567',
        email: 'juan.cruz@email.com',
        houseNo: '123 Mabini St',
        purok: 'Purok 2',
        barangay: 'Barangay Malinis',
        municipality: 'San Isidro',
        province: 'Laguna',
        zipCode: '4020',
        householdId: 'HH-2025-0010',
        relationship: 'Head',
        householdSize: 5,
        dwellingType: 'Concrete',
        ownershipStatus: 'Owned',
        education: 'College Graduate',
        occupation: 'Tricycle Driver',
        monthlyIncome: 12000,
        registeredVoter: true,
        precinctNo: '1023A',
        fourPs: false,
        seniorCitizen: false,
        pwd: false,
        soloParent: false,
        ip: false,
        nationalId: '1234-5678-9101',
        philhealth: '12-345678901-2',
        sss: '01-2345678-9',
        gsis: null,
        pagibig: '1234-5678-9012',
        emergencyName: 'Maria Dela Cruz',
        emergencyRelation: 'Wife',
        emergencyContact: '09189876543',
        remarks: 'Resident since 2010'
    },
    {
        id: 2,
        residentId: 'RES-2025-0002',
        firstName: 'Maria',
        middleName: 'Lopez',
        lastName: 'Santos',
        suffix: '',
        gender: 'Female',
        dateOfBirth: '1985-07-21',
        age: 40,
        civilStatus: 'Married',
        nationality: 'Filipino',
        religion: 'Roman Catholic',
        mobile: '09201234567',
        email: 'maria.santos@email.com',
        houseNo: '45 Rizal St',
        purok: 'Purok 1',
        barangay: 'Barangay Malinis',
        municipality: 'San Isidro',
        province: 'Laguna',
        zipCode: '4020',
        householdId: 'HH-2025-0011',
        relationship: 'Spouse',
        householdSize: 4,
        dwellingType: 'Concrete',
        ownershipStatus: 'Owned',
        education: 'High School Graduate',
        occupation: 'Sari-Sari Store Owner',
        monthlyIncome: 8000,
        registeredVoter: true,
        precinctNo: '1023B',
        fourPs: false,
        seniorCitizen: false,
        pwd: false,
        soloParent: false,
        ip: false,
        nationalId: '2234-5678-9102',
        philhealth: '13-345678901-2',
        sss: '02-2345678-9',
        gsis: null,
        pagibig: '2234-5678-9012',
        emergencyName: 'Pedro Santos',
        emergencyRelation: 'Husband',
        emergencyContact: '09181231234',
        remarks: 'Active in barangay events'
    },
    {
        id: 3,
        residentId: 'RES-2025-0003',
        firstName: 'Pedro',
        middleName: 'Garcia',
        lastName: 'Reyes',
        suffix: '',
        gender: 'Male',
        dateOfBirth: '1970-01-10',
        age: 55,
        civilStatus: 'Married',
        nationality: 'Filipino',
        religion: 'Iglesia ni Cristo',
        mobile: '09351234567',
        email: 'pedro.reyes@email.com',
        houseNo: '78 Bonifacio St',
        purok: 'Purok 4',
        barangay: 'Barangay Malinis',
        municipality: 'San Isidro',
        province: 'Laguna',
        zipCode: '4020',
        householdId: 'HH-2025-0012',
        relationship: 'Head',
        householdSize: 3,
        dwellingType: 'Wood',
        ownershipStatus: 'Rented',
        education: 'College Level',
        occupation: 'Farmer',
        monthlyIncome: 6000,
        registeredVoter: true,
        precinctNo: '1024A',
        fourPs: false,
        seniorCitizen: true,
        pwd: false,
        soloParent: false,
        ip: false,
        nationalId: '3234-5678-9103',
        philhealth: '14-345678901-2',
        sss: '03-2345678-9',
        gsis: null,
        pagibig: '3234-5678-9012',
        emergencyName: 'Luz Reyes',
        emergencyRelation: 'Wife',
        emergencyContact: '09175678901',
        remarks: 'Senior citizen member'
    },
    {
        id: 4,
        residentId: 'RES-2025-0004',
        firstName: 'Ana',
        middleName: 'De Guzman',
        lastName: 'Torres',
        suffix: '',
        gender: 'Female',
        dateOfBirth: '1995-09-05',
        age: 30,
        civilStatus: 'Single',
        nationality: 'Filipino',
        religion: 'Roman Catholic',
        mobile: '09173456789',
        email: 'ana.torres@email.com',
        houseNo: '89 Luna St',
        purok: 'Purok 3',
        barangay: 'Barangay Malinis',
        municipality: 'San Isidro',
        province: 'Laguna',
        zipCode: '4020',
        householdId: 'HH-2025-0013',
        relationship: 'Daughter',
        householdSize: 4,
        dwellingType: 'Concrete',
        ownershipStatus: 'Owned',
        education: 'College Graduate',
        occupation: 'Teacher',
        monthlyIncome: 18000,
        registeredVoter: true,
        precinctNo: '1024B',
        fourPs: false,
        seniorCitizen: false,
        pwd: false,
        soloParent: false,
        ip: false,
        nationalId: '4234-5678-9104',
        philhealth: '15-345678901-2',
        sss: '04-2345678-9',
        gsis: '05-1234567-8',
        pagibig: '4234-5678-9012',
        emergencyName: 'Pedro Torres',
        emergencyRelation: 'Father',
        emergencyContact: '09182345678',
        remarks: 'Newly registered voter'
    },

    {
        id: 5,
        residentId: 'RES-2025-0005',
        firstName: 'Mark',
        middleName: 'Villanueva',
        lastName: 'Ramos',
        suffix: '',
        gender: 'Male',
        dateOfBirth: '1992-11-12',
        age: 32,
        civilStatus: 'Single',
        nationality: 'Filipino',
        religion: 'Roman Catholic',
        mobile: '09181239876',
        email: 'mark.ramos@email.com',
        houseNo: '15 Burgos St',
        purok: 'Purok 5',
        barangay: 'Barangay Malinis',
        municipality: 'San Isidro',
        province: 'Laguna',
        zipCode: '4020',
        householdId: 'HH-2025-0014',
        relationship: 'Head',
        householdSize: 2,
        dwellingType: 'Concrete',
        ownershipStatus: 'Owned',
        education: 'College Graduate',
        occupation: 'Nurse',
        monthlyIncome: 25000,
        registeredVoter: true,
        precinctNo: '1025A',
        fourPs: false,
        seniorCitizen: false,
        pwd: false,
        soloParent: false,
        ip: false,
        nationalId: '5234-5678-9105',
        philhealth: '16-345678901-2',
        sss: '05-2345678-9',
        gsis: null,
        pagibig: '5234-5678-9012',
        emergencyName: 'Carla Ramos',
        emergencyRelation: 'Sister',
        emergencyContact: '09182342345',
        remarks: 'Works night shifts'
    },
    {
        id: 6,
        residentId: 'RES-2025-0006',
        firstName: 'Liza',
        middleName: 'Martinez',
        lastName: 'Bautista',
        suffix: '',
        gender: 'Female',
        dateOfBirth: '1988-04-18',
        age: 37,
        civilStatus: 'Married',
        nationality: 'Filipino',
        religion: 'Roman Catholic',
        mobile: '09175673421',
        email: 'liza.bautista@email.com',
        houseNo: '22 Mabini St',
        purok: 'Purok 2',
        barangay: 'Barangay Malinis',
        municipality: 'San Isidro',
        province: 'Laguna',
        zipCode: '4020',
        householdId: 'HH-2025-0015',
        relationship: 'Spouse',
        householdSize: 4,
        dwellingType: 'Concrete',
        ownershipStatus: 'Owned',
        education: 'College Graduate',
        occupation: 'Accountant',
        monthlyIncome: 30000,
        registeredVoter: true,
        precinctNo: '1025B',
        fourPs: false,
        seniorCitizen: false,
        pwd: false,
        soloParent: false,
        ip: false,
        nationalId: '6234-5678-9106',
        philhealth: '17-345678901-2',
        sss: '06-2345678-9',
        gsis: '06-1234567-8',
        pagibig: '6234-5678-9012',
        emergencyName: 'Jose Bautista',
        emergencyRelation: 'Husband',
        emergencyContact: '09181239876',
        remarks: 'Barangay treasurer volunteer'
    },
    {
        id: 7,
        residentId: 'RES-2025-0007',
        firstName: 'Jose',
        middleName: 'Manalo',
        lastName: 'Domingo',
        suffix: '',
        gender: 'Male',
        dateOfBirth: '1965-12-01',
        age: 59,
        civilStatus: 'Widowed',
        nationality: 'Filipino',
        religion: 'Born Again Christian',
        mobile: '09183456789',
        email: 'jose.domingo@email.com',
        houseNo: '76 Quezon St',
        purok: 'Purok 3',
        barangay: 'Barangay Malinis',
        municipality: 'San Isidro',
        province: 'Laguna',
        zipCode: '4020',
        householdId: 'HH-2025-0016',
        relationship: 'Head',
        householdSize: 1,
        dwellingType: 'Wood',
        ownershipStatus: 'Rented',
        education: 'High School Graduate',
        occupation: 'Security Guard',
        monthlyIncome: 12000,
        registeredVoter: true,
        precinctNo: '1026A',
        fourPs: false,
        seniorCitizen: true,
        pwd: false,
        soloParent: false,
        ip: false,
        nationalId: '7234-5678-9107',
        philhealth: '18-345678901-2',
        sss: '07-2345678-9',
        gsis: null,
        pagibig: '7234-5678-9012',
        emergencyName: 'Mario Domingo',
        emergencyRelation: 'Brother',
        emergencyContact: '09182349876',
        remarks: 'Senior citizen and solo dweller'
    },
    {
        id: 8,
        residentId: 'RES-2025-0008',
        firstName: 'Carmen',
        middleName: 'Dizon',
        lastName: 'Villena',
        suffix: '',
        gender: 'Female',
        dateOfBirth: '2000-06-09',
        age: 25,
        civilStatus: 'Single',
        nationality: 'Filipino',
        religion: 'Roman Catholic',
        mobile: '09181234590',
        email: 'carmen.villena@email.com',
        houseNo: '9 Aguinaldo St',
        purok: 'Purok 4',
        barangay: 'Barangay Malinis',
        municipality: 'San Isidro',
        province: 'Laguna',
        zipCode: '4020',
        householdId: 'HH-2025-0017',
        relationship: 'Daughter',
        householdSize: 3,
        dwellingType: 'Concrete',
        ownershipStatus: 'Owned',
        education: 'College Level',
        occupation: 'Student',
        monthlyIncome: 0,
        registeredVoter: true,
        precinctNo: '1026B',
        fourPs: false,
        seniorCitizen: false,
        pwd: false,
        soloParent: false,
        ip: false,
        nationalId: '8234-5678-9108',
        philhealth: '19-345678901-2',
        sss: null,
        gsis: null,
        pagibig: null,
        emergencyName: 'Rosa Villena',
        emergencyRelation: 'Mother',
        emergencyContact: '09182348765',
        remarks: 'Scholarship grantee'
    },
    {
        id: 9,
        residentId: 'RES-2025-0009',
        firstName: 'Ernesto',
        middleName: 'Pascual',
        lastName: 'Salazar',
        suffix: '',
        gender: 'Male',
        dateOfBirth: '1978-08-11',
        age: 47,
        civilStatus: 'Married',
        nationality: 'Filipino',
        religion: 'Roman Catholic',
        mobile: '09176543218',
        email: 'ernesto.salazar@email.com',
        houseNo: '34 Bonifacio St',
        purok: 'Purok 1',
        barangay: 'Barangay Malinis',
        municipality: 'San Isidro',
        province: 'Laguna',
        zipCode: '4020',
        householdId: 'HH-2025-0018',
        relationship: 'Head',
        householdSize: 6,
        dwellingType: 'Concrete',
        ownershipStatus: 'Owned',
        education: 'College Graduate',
        occupation: 'Electrician',
        monthlyIncome: 15000,
        registeredVoter: true,
        precinctNo: '1027A',
        fourPs: true,
        seniorCitizen: false,
        pwd: false,
        soloParent: false,
        ip: false,
        nationalId: '9234-5678-9109',
        philhealth: '20-345678901-2',
        sss: '08-2345678-9',
        gsis: null,
        pagibig: '9234-5678-9012',
        emergencyName: 'Mila Salazar',
        emergencyRelation: 'Wife',
        emergencyContact: '09182345673',
        remarks: '4Ps beneficiary household'
    },
    {
        id: 10,
        residentId: 'RES-2025-0010',
        firstName: 'Grace',
        middleName: 'Rosales',
        lastName: 'Navarro',
        suffix: '',
        gender: 'Female',
        dateOfBirth: '1999-02-27',
        age: 26,
        civilStatus: 'Single',
        nationality: 'Filipino',
        religion: 'Roman Catholic',
        mobile: '09181239087',
        email: 'grace.navarro@email.com',
        houseNo: '56 Mabini St',
        purok: 'Purok 2',
        barangay: 'Barangay Malinis',
        municipality: 'San Isidro',
        province: 'Laguna',
        zipCode: '4020',
        householdId: 'HH-2025-0019',
        relationship: 'Daughter',
        householdSize: 5,
        dwellingType: 'Concrete',
        ownershipStatus: 'Owned',
        education: 'College Graduate',
        occupation: 'Call Center Agent',
        monthlyIncome: 22000,
        registeredVoter: true,
        precinctNo: '1027B',
        fourPs: false,
        seniorCitizen: false,
        pwd: false,
        soloParent: false,
        ip: false,
        nationalId: '1034-5678-9110',
        philhealth: '21-345678901-2',
        sss: '09-2345678-9',
        gsis: null,
        pagibig: '1034-5678-9012',
        emergencyName: 'Ramon Navarro',
        emergencyRelation: 'Father',
        emergencyContact: '09182349871',
        remarks: 'Active SK volunteer'
    },

])


const search = ref('')
const showModal = ref(false)
const editingResident = ref(null)
const form = ref({ name: '', room: '', contact: '' })

const filteredResidents = computed(() =>
    residents.value.filter(r =>
        r.firstName.toLowerCase().includes(search.value.toLowerCase()) ||
        r.purok.toLowerCase().includes(search.value.toLowerCase()) ||
        r.mobile.toLowerCase().includes(search.value.toLowerCase())
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

<!-- <style scoped>
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

th,
td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
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
</style> -->