<template>
    <div class="pt-8">
        <div class="card w-1/2 mx-auto bg-base-100 shadow-sm">
            <div class="card-body">
                <div class="card-header flex  mb-2">
                    <p class="text-lg font-bold">User Management</p>
                    <button class="btn btn-accent btn-circle" @click="openAddModal">
                        <svg class="w-5 h-5 text-gray-600 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </button>
                </div>
                <table class="table">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th></th>
                            <th>Username</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>HelloWorld</td>
                            <td>Secretary</td>
                            <td>
                                <button class="btn btn-circle">
                                    <svg class="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M10 14v3m4-6V7a3 3 0 1 1 6 0v4M5 11h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Add User Modal -->
    <dialog ref="add_user_modal" class="modal">
        <form method="dialog" @submit.prevent="saveUser">
            <div class="modal-box w-96">
                <div class="flex flex-col gap-2">
                    <div class="form-control">
                        <label for="" class="label">
                            <span class="label-text">Username</span></label>
                        <input type="text" v-model="username" placeholder="Enter username" class="input input-bordered">
                    </div>
                    <div class="form-control flex flex-col">
                        <label for="" class="label">
                            <span class="label-text">Password</span></label>
                        <input type="text" v-model="password" placeholder="Enter password" class="input input-bordered">
                        <label class="label-text-alt text-gray-400">
                            Leave it blank for the default password (barangay)
                        </label>
                    </div>
                    <div class="form-control" >
                        <select class="select" v-model="user_role">
                            <option disabled selected value="">Select a role</option>
                            <option value="Admin">Admin</option>
                            <option value="Secretary">Secretary</option>
                            <option value="Treasurer">Treasurer</option>
                            <option value="">Kagawad</option>
                        </select>
                    </div>
                </div>
                <div class="modal-action">
                    <button class="btn btn-accent">Save</button>
                    <button class="btn">Close</button>
                </div>
            </div>
        </form>
    </dialog>
</template>

<script setup>
import { ref } from 'vue'

const add_user_modal = ref(null)
const user_role = ref('')
const username = ref('')
const password = ref('')

const openAddModal = () => {
    add_user_modal.value?.showModal()
}

const saveUser = () => {
   const result = await window.api.addUser({
    username: username.value,
    password: password.value,
    user_role: user_role.value
   });

   if(result.success){
    message.value = "User created",
    username.value = "";
    password.value = "";
   }else{
    message.value = result.error
   }
}
</script>