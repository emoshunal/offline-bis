<template>
  <div class="flex min-h-[80vh] pt-8">
    <!-- Sidebar -->
    <aside class="w-64 border-r hidden lg:flex xl:flex border-gray-200">
      <ul class="menu p-4 gap-2" style="font-family: satoshi">
        <li>
          <RouterLink to="#" active-class="bg-gray-200 text-gray-800 rounded-lg"
            >Basic Information
          </RouterLink>
        </li>
        <li><a>Contact and Address Details</a></li>
        <li><a>Household Information</a></li>
        <li><a>Demographic and Socio Economic Data</a></li>
        <li><a>Identification Details</a></li>
      </ul>
    </aside>

    <!-- Main form -->
    <main class="flex-1 p-8">
      <h1 class="text-2xl font-bold mb-2">Add New Resident</h1>
      <p class="text-sm mb-6 text-gray-600">
        Fill out this form to register a new resident in the Barangay Information System (BIS).
        Please provide accurate and complete details to maintain reliable resident records.
      </p>

      <div
        class="fieldset bg-base-200 border-base-300 rounded-box border w-full xl:w-3/4 p-4 max-h-[75vh] overflow-y-auto"
      >
        <h2 class="card-title">Identity Information</h2>
        <p class="text-sm text-gray-500 mb-4">
          This section collects the resident’s personal information and demographic details.
        </p>

        <form @submit.prevent="submitForm">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            <!-- First Name -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">First Name</span>
              </label>
              <input
                type="text"
                v-model="form.first_name"
                placeholder="Enter given name"
                class="input input-bordered"
                required
              />
              <label class="label-text-alt text-gray-400"> Resident’s legal first name </label>
            </div>

            <!-- Middle Name -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Middle Name</span>
              </label>
              <input
                type="text"
                v-model="form.middle_name"
                placeholder="Enter middle name"
                class="input input-bordered"
              />
              <label class="label-text-alt text-gray-400"> Leave blank if none </label>
            </div>

            <!-- Last Name -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Last Name</span>
              </label>
              <input
                type="text"
                v-model="form.last_name"
                placeholder="Enter surname"
                class="input input-bordered"
                required
              />
              <label class="label-text-alt text-gray-400"> Resident’s legal family name </label>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Suffix</span>
              </label>
              <input
                type="text"
                v-model="form.suffix"
                placeholder="Enter suffix"
                class="input input-bordered"
              />
              <label class="label-text-alt text-gray-400"> Leave blank if none </label>
            </div>
            <!-- Gender -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Gender</span>
              </label>
              <select v-model="form.gender" class="select select-bordered">
                <option value=""disabled selected>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label class="label-text-alt text-gray-400"> Resident’s gender identity </label>
            </div>

            <!-- Date of Birth -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Date of Birth</span>
              </label>
              <input type="date" v-model="form.dob" class="input input-bordered" />
              <label class="label-text-alt text-gray-400"> Used to determine age </label>
            </div>

            <!-- Country of Birth -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Place of Birth</span>
              </label>
              <input
                type="text"
                v-model="form.pob"
                placeholder="Enter country"
                class="input input-bordered"
              />
              <label class="label-text-alt text-gray-400">
                Place where the resident was born
              </label>
            </div>

            <!-- Country of Nationality -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Citizenship</span>
              </label>
              <input
                type="text"
                v-model="form.citizenship"
                placeholder="Enter nationality"
                value="Filipino"
                class="input input-bordered"
              />
              <label class="label-text-alt text-gray-400">
                Leave it blank if a Filipino citizen
              </label>
            </div>

            <!-- Marital Status -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Marital Status</span>
              </label>
              <select v-model="form.marital_status" class="select select-bordered">
                <option disabled selected>Select status</option>
                <option value="Single" selected>Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Separated">Separated</option>
              </select>
              <label class="label-text-alt text-gray-400">
                Current civil status of the resident
              </label>
            </div>

            <!-- Citizenship -->
            <div class="flex justify-start items-center gap-3">
              <label class="label">
                <span class="label-text">Registered voter?</span>
              </label>
              <div class="flex justify-center items-center gap-3">
                <div class="space-x-2">
                  <label for="" class="label font-semibold">Yes</label>
                  <input
                    type="radio"
                    name="radio-6"
                    class="radio radio-accent"
                    v-model="form.voter"
                    :value=1
                  />
                </div>
                <div class="space-x-2">
                  <label for="" class="label font-semibold">No</label>
                  <input
                    type="radio"
                    name="radio-6"
                    class="radio radio-accent"
                    v-model="form.voter"
                    :value=0
                  />
                </div>
              </div>
            </div>

            <div class="flex justify-start items-center gap-3">
              <label class="label">
                <span class="label-text">Person with Disability?</span>
              </label>
              <div class="flex justify-center items-center gap-3">
                <div class="space-x-2">
                  <label for="" class="label font-semibold">Yes</label>
                  <input
                    type="radio"
                    name="rdPwd"
                    class="radio radio-accent"
                    v-model="form.pwd"
                    :value=1
                  />
                </div>
                <div class="space-x-2">
                  <label for="" class="label font-semibold">No</label>
                  <input
                    type="radio"
                    name="rdPwd"
                    class="radio radio-accent"
                    v-model="form.pwd"
                    :value=0
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Submit Button -->

          <div class="border-b border-gray-200 pt-4 my-4 cols-span-3 w-full"></div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            <div class="col-span-3">
              <p class="card-title text-lg">Contact and Address Details</p>
              <p class="text-sm text-gray-600">
                Please provide the complete current residential address of the resident.
              </p>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Residency Status</span>
              </label>
              <select v-model="form.residency_status" class="select select-bordered">
                <!-- <option disabled value="" selected>Select status</option> -->
                <option value="Permanent">Permanent Resident</option>
                <option value="Temporary">Temporary Resident</option>
                <option value="Boarder">Boarder/ Lodger</option>
                <option value="Tenant">Tenant</option>
                <option value="Informal Settler">Informal Settler</option>
                <option value="Other">Other</option>
              </select>
              <label class="label-text-alt text-gray-400">
                Current residency status of the resident
              </label>
            </div>
            <div v-if="form.residency_status === 'Other'" class="form-control">
              <label class="label">
                <span class="label-text">Other (specify)</span>
              </label>
              <input
                type="text"
                v-model="otherResidency"
                placeholder="Please specify..."
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label for="" class="label">
                <span class="label-text">Resident Since</span>
              </label>
              <input type="date" v-model="form.resident_since" class="input input-bordered" />
              <label class="label-text-alt text-gray-400"> Start date of residency </label>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">House No. / Street</span>
              </label>
              <input
                type="text"
                v-model="form.house_no_st"
                placeholder="123 Mabini St."
                class="input input-bordered"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Purok / Sitio</span>
              </label>
              <input
                type="text"
                v-model="form.sitio"
                placeholder="Enter purok or sitio"
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Phone Number</span>
              </label>
              <input
                type="text"
                v-model="form.phone"
                placeholder="Enter phone numer"
                class="input input-bordered"
              />
            </div>
          </div>

          <div class="border-b border-gray-200 pt-4 my-4 cols-span-4 w-full"></div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            <div class="col-span-3">
              <p class="card-title text-lg">Household Information</p>
              <p class="text-sm text-gray-600">
                Please provide the complete current household and family information of the
                resident.
              </p>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Household type</span>
              </label>
              <select v-model="form.household_type" class="select select-bordered">
                <option value="" disabled selected>Select type</option>
                <option value="Head">Head</option>
                <option value="Member">Member</option>
              </select>
              <label class="label-text-alt text-gray-400"> Current household status </label>
            </div>
            <div class="form-control" v-if="form.household_type === 'Member'">
              <label class="label">
                <span class="label-text">Household Head Name</span>
              </label>
              <input
                type="text"
                v-model="search_name_query"
                @input="onSearch"
                @focus="showResults = true"
                class="input input-bordered"
                placeholder="Enter the household head"
              />
              <ul
                v-if="showResults && searchResults.length"
                class="bg-base-100 border border-gray-300 rounded-md mt-1 w-full shadow-md max-h-24 overflow-y-auto z-50"
              >
                <li
                  v-for="resident in searchResults"
                  :key="resident.resident_id"
                  class="p-2 hover:bg-gray-100 cursor-pointer"
                  @click="selectResident(resident)"
                >
                  {{ resident.household_head_name }}
                </li>
              </ul>

              <label class="label-text-alt text-gray-400">
                Leave it blank if the head is not yet added
              </label>
            </div>
            <div class="form-control" v-if="form.household_type === 'Head'">
              <label class="label">
                <span class="label-text">Ownership Status</span>
              </label>
              <select v-model="form.ownership_status" class="select select-bordered">
                <option value=""disabled selected>Select house ownership</option>
                <option value="Owned">Owned</option>
                <option value="Owned - Amortized">Owned - Amortized</option>
                <option value="Renting">Renting</option>
                <option value="Rent-Free (with consent)">Rent-Free (with consent)</option>
                <option value="Informal Settler">Informal Settler</option>
                <option value="Government Housing">Government Housing</option>
                <option value="Shared Ownership">Shared Ownership</option>
                <option value="Institution-Owned">Institution-Owned</option>
                <option value="Other">Other</option>
              </select>
              <label class="label-text-alt text-gray-400">
                Provide relationship to household head
              </label>
            </div>
              <div class="form-control" v-if="form.household_type === 'Head'">
              <label class="label">
                <span class="label-text">Housing type</span>
              </label>
              <select v-model="form.housing_type" class="select select-bordered">
                <option value=""disabled selected>Select housing type</option>
                <option value="Concrete">Concrete</option>
                <option value="Concrete">Wood</option>
                <option value="Mix">Mix</option>
                <option value="Apartment">Apartment</option>
                <option value="Informal Settlement">Informal Settlement</option>
                <option value="Government Housing">Government Housing</option>
                <option value="Quarters">Quarters</option>
                <option value="Condominium Unit">Condominium Unit</option>
                <option value="Duplex">Duplex</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="form-control" v-if="form.ownership_status === 'Other'">
              <label class="label">
                <span class="label-text">Other (specify)</span>
              </label>
              <input type="text" placeholder="Please specify..." class="input input-bordered" />
            </div>
            <div class="form-control" v-if="form.household_type === 'Member'">
              <label class="label">
                <span class="label-text">Relationship (Household)</span>
              </label>
              <select v-model="form.relationship_to_household_head" class="select select-bordered">
                <option value="" disabled selected>Select relationship</option>
                <option value="Child">Child</option>
                <option value="Sibling">Sibling</option>
                <option value="Spouse">Spouse</option>
                <option value="Husband">Husband</option>
                <option value="Parent">Parent</option>
                <option value="Relative">Relative</option>
                <option value="Other">Other</option>
              </select>
              <label class="label-text-alt text-gray-400">
                Provide relationship to household head
              </label>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Family type</span>
              </label>
              <select v-model="form.family_type"  class="select select-bordered">
                <option value="" disabled selected>Select type</option>
                <option value="Head">Head</option>
                <option value="Member">Member</option>
              </select>
              <label class="label-text-alt text-gray-400"> Current family status </label>
            </div>
            <div class="form-control" v-if="form.family_type === 'Member'">
              <label class="label">
                <span class="label-text">Family Head Name</span>
              </label>
              <input
                type="text"
                v-model="search_name_query_f"
                @input="onSearch_f"
                @focus="showResults_f = true"
                class="input input-bordered"
                placeholder="Enter the household head"
              />
              <ul
                v-if="showResults_f && searchResults_f.length"
                class="bg-base-100 border border-gray-300 rounded-md mt-1 w-full shadow-md max-h-24 overflow-y-auto z-50"
              >
                <li
                  v-for="resident in searchResults_f"
                  :key="resident.resident_id"
                  class="p-2 hover:bg-gray-100 cursor-pointer"
                  @click="selectResident_f(resident)"
                >
                  {{ resident.family_head_name }}
                </li>
              </ul>
              <label class="label-text-alt text-gray-400">
                Leave it blank if the head is not yet added
              </label>
            </div>
            <div class="form-control" v-if="form.family_type === 'Member'">
              <label class="label">
                <span class="label-text">Relationship (Family)</span>
              </label>
              <select v-model="form.relationship_to_family_head" class="select select-bordered">
                <option value="" disabled selected>Select relationship</option>
                <option value="Child">Child</option>
                <option value="Sibling">Sibling</option>
                <option value="Spouse">Spouse</option>
                <option value="Husband">Husband</option>
                <option value="Parent">Parent</option>
                <option value="Relative">Relative</option>
                <option value="Other">Other</option>
              </select>
              <label class="label-text-alt text-gray-400">
                Provide relationship to family head
              </label>
            </div>
          </div>
          <div class="border-b border-gray-200 pt-4 my-4 cols-span-3 w-full"></div>
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3">
              <p class="card-title text-lg">Social Economic Data</p>
              <p class="text-sm text-gray-600">
                Please provide the complete current source of income of the resident.
              </p>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Source of income</span>
              </label>
              <input
                type="text"
                v-model="form.soi"
                placeholder="Enter source of income"
                class="input input-bordered"
              />
              <label class="label-text-alt text-gray-400"> Leave it blank if none </label>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Gross monthly income in peso</span>
              </label>
              <input
                type="text"
                v-model="form.income"
                placeholder="Enter monthly income"
                class="input input-bordered"
              />
              <label class="label-text-alt text-gray-400"> Leave it blank if none </label>
            </div>
          </div>
          <div>
            <div class="border-b border-gray-200 pt-4 my-4 cols-span-3 w-full"></div>
            <p class="text-bold text-sm font-light text-center text-gray-500">
              Note: Ensure that all resident information entered is accurate and complete.
            </p>
          </div>
          <div class="py-4">
            <button class="btn btn-accent btn-block">Save Resident Record</button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref, toRaw, reactive } from 'vue'
import { useResidents } from '../../../composables/useResidents'
import { useUsers } from '../../../composables/useUsers'

const { addResident, searchFamilydHead, searchHouseholdHead } = useResidents()
const { currentUser } = useUsers()

const isVoter = ref(0)
const isPwd = ref(0)
const residencyStatus = ref('')
const otherResidency = ref('')
const searchResults = ref([])
const showResults = ref(false)
const selectedResident = ref(null)
const search_name_query = ref('')
const searchResults_f = ref([])
const showResults_f = ref(false)
const selectedResident_f = ref(null)
const search_name_query_f = ref('')
let searchTimeout = null
const onSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    if (search_name_query.value.trim() === '') {
      searchResults.value = []
      return
    }

    const res = await searchHouseholdHead(search_name_query.value)
    if (res && res.success) {
      searchResults.value = res.residents
      showResults.value = true // ✅ show dropdown when there are results
    } else {
      searchResults.value = []
    }
  }, 300)
  console.log(searchResults.value)
}

const selectResident = (resident) => {
  search_name_query.value = `${resident.household_head_name}`
  form.household_id = resident.household_id
  selectedResident.value = resident
  showResults.value = false
}

const onSearch_f = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    if (search_name_query_f.value.trim() === '') {
      searchResults_f.value = []
      return
    }

    const res = await searchFamilydHead(search_name_query_f.value)
    if (res && res.success) {
      searchResults_f.value = res.residents
      showResults_f.value = true // ✅ show dropdown when there are results
    } else {
      searchResults_f.value = []
    }
  }, 300)
}

const selectResident_f = (resident) => {
  search_name_query_f.value = `${resident.family_head_name}`
  form.family_id = resident.family_id
  selectedResident_f.value = resident
  showResults_f.value = false
}
const form = reactive({
  first_name: '',
  last_name: '',
  middle_name: '',
  suffix: '',
  age: null,
  dob: '',
  gender: '',
  pob: '',
  citizenship: 'Filipino',
  marital_status: 'Single',
  pwd: 0,
  voter: 0,
  residency_status: 'Permanent',
  residency_status_other: null,
  resident_since: '',
  house_no_st: '',
  sitio: '',
  phone: '',
  soi: '',
  income: '',
  relationship_to_household_head: '',
  relationship_to_family_head: '',
  household_id: null,
  household_type: '',
  family_type: '',
  family_id: null,
  housing_type: null,
  ownership_status: '',
  added_by_user_id: currentUser.value.user_id
})
const submitForm = async () => {
  const res = await addResident(JSON.parse(JSON.stringify(toRaw(form))))
  console.log("Family id is: ", form.family_id, "Household id is: ", form.household_id)
  if (res.success) {
    alert(`✅ Resident ${form.first_name} ${form.last_name} added successfully!`)
  } else {
    alert('⚠️ Failed: ' + res.error)
    console.error(res.error)
  }
}

const finalResidency = computed(() => {
  return residencyStatus.value === 'Other' ? otherResidency.value : residencyStatus.value
})


</script>
