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

                <form>
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
                        <div class="form-control col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3 flex flex-col">
                            <label class="label">
                                <span class="label-text">Suffix</span>
                            </label>
                            <input type="text" placeholder="Enter suffix" class="input input-bordered" />
                            <label class="label-text-alt text-gray-400">
                                Leave blank if none
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
                            <select class="select select-bordered">
                                <option disabled selected>Select status</option>
                                <option>Permanent Resident</option>
                                <option>Boarder/ Lodger</option>
                                <option>Staying with Relatives</option>
                                <option>Informal Settler</option>
                                <option value="">Overseas</option>
                                <option value="">Other</option>
                            </select>
                            <label class="label-text-alt text-gray-400">
                                Current residency status of the resident
                            </label>

                        </div>
                        <div class="form-control col-span-1 lg:col-span-3 xl:col-span-3 flex flex-col">
                            <label class="label">
                                <span class="label-text">Other (specify)</span>
                            </label>
                            <input type="text" placeholder="Please specify..." class="input input-bordered" />

                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">House No. / Street</span>
                            </label>
                            <input type="text" placeholder="123 Mabini St." class="input input-bordered" />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Place of Birth</span>
                            </label>
                            <input type="text" placeholder="Enter country" class="input input-bordered" />
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
                        <div class="form-control  col-span-1 lg:col-span-2 xl:col-span-2 flex flex-col">
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
                                <span class="label-text">Relationship</span>
                            </label>
                             <select class="select select-bordered">
                                <option disabled selected>Select relationship</option>
                                <option>Child</option>
                                <option>Spouse</option>
                                <option value="">Husband</option>
                                <option value="">Other</option>
                            </select>
                            <label class="label-text-alt text-gray-400">
                                Provide the family's relationship
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
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Gross monthly income</span>
                            </label>
                            <input type="text" placeholder="Enter monthly income" class="input input-bordered">

                        </div>
                    </div>
                    <div>
                        <div class="border-b border-gray-200 pt-4 my-4 cols-span-3 w-full"></div>
                        <p class="text-bold text-sm font-light text-center text-gray-500">Note: Ensure that all resident
                            information entered is accurate and complete.</p>
                    </div>
                    <div class="py-4">
                        <button class="btn btn-accent btn-ghost btn-block">Save Resident Record</button>
                    </div>

                </form>
            </div>
        </main>
    </div>
</template>
