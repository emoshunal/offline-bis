<template>
    <div class="flex min-h-[80vh] pt-8">
        <!-- Sidebar -->
        <aside class="w-64 border-r hidden lg:flex xl:flex border-gray-200">
            <ul class="menu p-4 gap-2" style="font-family:  satoshi;">
                <li>
                    <RouterLink to="#" active-class="bg-gray-200 text-gray-800 rounded-lg">Basic Information
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
                class="fieldset  bg-base-200 border-base-300 rounded-box border w-full xl:w-3/4 p-4 max-h-[75vh] overflow-y-auto">

                <h2 class="card-title">Identity Information</h2>
                <p class="text-sm text-gray-500 mb-4">
                    This section collects the resident’s personal information and demographic details.
                </p>

                <form @submit.prevent="checkData">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-6">


                        <!-- First Name -->
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">First Name</span>
                            </label>
                            <input type="text" placeholder="Enter given name" class="input input-bordered" />
                            <label class="label-text-alt text-gray-400">
                                Resident’s legal first name
                            </label>
                        </div>

                        <!-- Middle Name -->
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Middle Name</span>
                            </label>
                            <input type="text" placeholder="Enter middle name" class="input input-bordered" />
                            <label class="label-text-alt text-gray-400">
                                Leave blank if none
                            </label>
                        </div>

                        <!-- Last Name -->
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Last Name</span>
                            </label>
                            <input type="text" placeholder="Enter surname" class="input input-bordered" />
                            <label class="label-text-alt text-gray-400">
                                Resident’s legal family name
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Suffix</span>
                            </label>
                            <input type="text" placeholder="Enter suffix" class="input input-bordered" />
                            <label class="label-text-alt text-gray-400">
                                Leave blank if none
                            </label>
                        </div>
                        <!-- Gender -->
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Gender</span>
                            </label>
                            <select class="select select-bordered">
                                <option disabled selected>Select gender</option>
                                <option>Male</option>
                                <option>Female</option>

                            </select>
                            <label class="label-text-alt text-gray-400">
                                Resident’s gender identity
                            </label>
                        </div>


                        <!-- Date of Birth -->
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Date of Birth</span>
                            </label>
                            <input type="date" class="input input-bordered" />
                            <label class="label-text-alt text-gray-400">
                                Used to determine age
                            </label>
                        </div>


                        <!-- Country of Birth -->
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Place of Birth</span>
                            </label>
                            <input type="text" placeholder="Enter country" class="input input-bordered" />
                            <label class="label-text-alt text-gray-400">
                                Place where the resident was born
                            </label>
                        </div>

                        <!-- Country of Nationality -->
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Citizenship</span>
                            </label>
                            <input type="text" placeholder="Enter nationality" value="Filipino"
                                class="input input-bordered" />
                            <label class="label-text-alt text-gray-400">
                                Leave it blank if a Filipino citizen
                            </label>
                        </div>

                        <!-- Marital Status -->
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Marital Status</span>
                            </label>
                            <select class="select select-bordered">
                                <option disabled selected>Select status</option>
                                <option value="Single" selected>Single</option>
                                <option>Married</option>
                                <option>Widowed</option>
                                <option>Separated</option>
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
                                    <input type="radio" name="radio-6" class="radio radio-accent" v-model="isVoter"
                                        :value="true" />
                                </div>
                                <div class="space-x-2">
                                    <label for="" class="label font-semibold">No</label>
                                    <input type="radio" name="radio-6" class="radio radio-accent" v-model="isVoter"
                                        :value="false" />
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
                                    <input type="radio" name="rdPwd" class="radio radio-accent" v-model="isPwd"
                                        :value="true" />
                                </div>
                                <div class="space-x-2">
                                    <label for="" class="label font-semibold">No</label>
                                    <input type="radio" name="rdPwd" class="radio radio-accent" v-model="isPwd"
                                        :value="false" />
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
                        <div class="form-control ">
                            <label class="label">
                                <span class="label-text">Residency Status</span>
                            </label>
                            <select v-model="residencyStatus" class="select select-bordered">
                                <!-- <option disabled value="" selected>Select status</option> -->
                                <option value="Permanent Resident">Permanent Resident</option>
                                <option value="Temporary Resident">Temporary Resident</option>
                                <option value="Boarder/ Lodger">Boarder/ Lodger</option>
                                <option value="Tenant">Tenant</option>
                                <option value="Informal Settler">Informal Settler</option>
                                <option value="Other">Other</option>
                            </select>
                            <label class="label-text-alt text-gray-400">
                                Current residency status of the resident
                            </label>

                        </div>
                        <div v-if="residencyStatus === 'Other'" class="form-control">
                            <label class="label">
                                <span class="label-text">Other (specify)</span>
                            </label>
                            <input type="text" v-model="otherResidency" placeholder="Please specify..." class="input input-bordered" />

                        </div>
                        <div class="form-control">
                            <label for="" class="label">
                                <span class="label-text">Resident Since</span>
                            </label>
                            <input type="date" class="input input-bordered">
                            <label class="label-text-alt text-gray-400">
                                Start date of residency
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">House No. / Street</span>
                            </label>
                            <input type="text" placeholder="123 Mabini St." class="input input-bordered" />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Purok / Sitio</span>
                            </label>
                            <input type="text" placeholder="Enter purok or sitio" class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Phone Number</span>
                            </label>
                            <input type="text" placeholder="Enter phone numer" class="input input-bordered">

                        </div>
                    </div>

                    <div class="border-b border-gray-200 pt-4 my-4 cols-span-4 w-full"></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">

                        <div class="col-span-3">
                            <p class="card-title text-lg">Household Information</p>
                            <p class="text-sm text-gray-600">
                                Please provide the complete current household and family information of the resident.
                            </p>
                        </div>

                        <div class="form-control ">
                            <label class="label">
                                <span class="label-text">Household type</span>
                            </label>
                            <select class="select select-bordered">
                                <option disabled selected>Select type</option>
                                <option>Head</option>
                                <option>Member</option>
                            </select>
                            <label class="label-text-alt text-gray-400">
                                Current household status
                            </label>

                        </div>
                        <div class="form-control ">
                            <label class="label">
                                <span class="label-text">Household Head Name</span>
                            </label>
                            <input type="text" class="input input-bordered" placeholder="Enter the household head">
                            <label class="label-text-alt text-gray-400">
                                Leave it blank if the head is not yet added
                            </label>

                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Ownership Status</span>
                            </label>
                            <select class="select select-bordered">
                                <option disabled selected>Select house ownership</option>
                                <option>Owned</option>
                                <option value="">Owned - Amortized</option>
                                <option>Renting</option>
                                <option value="">Rent-Free (with consent)</option>
                                <option value="">Informal Settler</option>
                                <option value="">Government Housing</option>
                                <option value="">Shared Ownership</option>
                                <option value="">Institution-Owned</option>
                                <option value="">Other</option>
                            </select>
                            <label class="label-text-alt text-gray-400">
                                Provide relationship to household head
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Other (specify)</span>
                            </label>
                            <input type="text" placeholder="Please specify..." class="input input-bordered" />

                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Relationship (Household)</span>
                            </label>
                            <select class="select select-bordered">
                                <option disabled selected>Select relationship</option>
                                <option>Child</option>
                                <option value="">Sibling</option>
                                <option>Spouse</option>
                                <option value="">Husband</option>
                                <option value="">Parent</option>
                                <option value="">Relative</option>
                                <option value="">Other</option>
                            </select>
                            <label class="label-text-alt text-gray-400">
                                Provide relationship to household head
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Family type</span>
                            </label>
                            <select class="select select-bordered">
                                <option disabled selected>Select type</option>
                                <option>Head</option>
                                <option>Member</option>
                            </select>
                            <label class="label-text-alt text-gray-400">
                                Current family status
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Family Head Name</span>
                            </label>
                            <input type="text" class="input input-bordered" placeholder="Enter the family head">
                            <label class="label-text-alt text-gray-400">
                                Leave it blank if the head is not yet added
                            </label>

                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Relationship (Family)</span>
                            </label>
                            <select class="select select-bordered">
                                <option disabled selected>Select relationship</option>
                                <option>Child</option>
                                <option value="">Sibling</option>
                                <option>Spouse</option>
                                <option value="">Husband</option>
                                <option value="">Parent</option>
                                <option value="">Relative</option>
                                <option value="">Other</option>
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
                            <input type="text" placeholder="Enter source of income" class="input input-bordered" />
                            <label class="label-text-alt text-gray-400">
                                Leave it blank if none
                            </label>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Gross monthly income in peso</span>
                            </label>
                            <input type="text" placeholder="Enter monthly income" class="input input-bordered">
                            <label class="label-text-alt text-gray-400">
                                Leave it blank if none
                            </label>
                        </div>
                    </div>
                    <div>
                        <div class="border-b border-gray-200 pt-4 my-4 cols-span-3 w-full"></div>
                        <p class="text-bold text-sm font-light text-center text-gray-500">Note: Ensure that all resident
                            information entered is accurate and complete.</p>
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
import { computed, ref } from 'vue'
const isVoter = ref(true)
const isPwd = ref(false)
const residencyStatus = ref('')
const otherResidency = ref('')

const finalResidency = computed(() => {
  return residencyStatus.value === 'Other'
    ? otherResidency.value
    : residencyStatus.value
})


const checkData = () => {
    console.log(
         `Residency: ${finalResidency.value}\nIs Voter: ${isVoter.value}\nIs PWD: ${isPwd.value}`
    )
}
</script>
