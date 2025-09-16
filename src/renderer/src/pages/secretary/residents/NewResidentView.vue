<template>
    <div class="flex min-h-[80vh] pt-8">
        <!-- Sidebar -->
        <aside class="w-64  border-r border-gray-200">
            <ul class="menu p-4 gap-2" style="font-family:  satoshi;">
                <li>
                    <RouterLink to="#" active-class="bg-gray-200 text-gray-800 rounded-lg">Basic Information</RouterLink>
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

            <div class="fieldset  bg-base-200 border-base-300 rounded-box w-xl border p-4 max-h-[75vh] overflow-y-auto">

                <h2 class="card-title">Identity Information</h2>
                <p class="text-sm text-gray-500 mb-4">
                    This section collects the resident’s personal information and demographic details.
                </p>

                <form class="grid grid-cols-2 gap-6">
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

                    <!-- Gender -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Gender</span>
                        </label>
                        <select class="select select-bordered">
                            <option disabled selected>Select gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                        <label class="label-text-alt text-gray-400">
                            Resident’s gender identity
                        </label>
                    </div>

                    <!-- Country of Birth -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Country of Birth</span>
                        </label>
                        <input type="text" placeholder="Enter country" class="input input-bordered" />
                        <label class="label-text-alt text-gray-400">
                            Country where the resident was born
                        </label>
                    </div>

                    <!-- Country of Nationality -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Nationality</span>
                        </label>
                        <input type="text" placeholder="Enter nationality" class="input input-bordered" />
                        <label class="label-text-alt text-gray-400">
                            Example: Filipino, American, etc.
                        </label>
                    </div>

                    <!-- Marital Status -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Marital Status</span>
                        </label>
                        <select class="select select-bordered">
                            <option disabled selected>Select status</option>
                            <option>Single</option>
                            <option>Married</option>
                            <option>Widowed</option>
                            <option>Separated</option>
                        </select>
                        <label class="label-text-alt text-gray-400">
                            Current civil status of the resident
                        </label>
                    </div>

                    <!-- Citizenship -->
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Citizenship</span>
                        </label>
                        <input type="text" placeholder="Enter citizenship" class="input input-bordered" />
                        <label class="label-text-alt text-gray-400">
                            Country where the resident holds citizenship
                        </label>
                    </div>

                    <!-- Submit Button -->

                </form>
                <div class="border-b border-gray-200 pt-4 pb-2"></div>
                <div>
                    <p class="card-title text-lg">Contact and Address Details</p>
                    <p class="text-sm mb-6 text-gray-600">
                        Please provide the complete current residential address of the resident.
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="label">
                                <span class="label-text">House No. / Street</span>
                            </label>
                            <input type="text" placeholder="123 Mabini St." class="input input-bordered w-full" />
                        </div>

                        <div>
                            <label class="label">
                                <span class="label-text">Purok / Zone</span>
                            </label>
                            <input type="text" placeholder="Purok 2" class="input input-bordered w-full" />
                        </div>

                        <div>
                            <label class="label">
                                <span class="label-text">Barangay</span>
                            </label>
                            <input type="text" placeholder="Barangay Malinis" class="input input-bordered w-full" />
                        </div>

                        <div>
                            <label class="label">
                                <span class="label-text">Municipality / City</span>
                            </label>
                            <input type="text" placeholder="San Isidro" class="input input-bordered w-full" />
                        </div>

                        <div>
                            <label class="label">
                                <span class="label-text">Province</span>
                            </label>
                            <input type="text" placeholder="Laguna" class="input input-bordered w-full" />
                        </div>

                        <div>
                            <label class="label">
                                <span class="label-text">ZIP Code</span>
                            </label>
                            <input type="text" placeholder="4020" class="input input-bordered w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
