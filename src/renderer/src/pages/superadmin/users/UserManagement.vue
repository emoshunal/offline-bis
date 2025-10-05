<template>
    <div class="pt-8">
        <div class="card w-1/2 mx-auto bg-base-100 shadow-sm">
            <div class="card-body">
                <div class="card-header flex  mb-2">
                    <p class="text-lg font-bold">User Management</p>
                    <IconButton icon="plus" @click="openAddModal"/>

                </div>
              <UserTable :users="users" @edit="updateUser" @delete="deleteUser"/>
            </div>
        </div>
    </div>
    <UserAddModal
    ref="modalRef"
    @saved="fetchUsers"
    />
    
 
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUsers } from '../../../composables/useUsers'
import IconButton from '../../../components/Shared/IconButton.vue'
import UserTable from './components/UserTable.vue'
import UserAddModal from './components/UserAddModal.vue'

const { users, fetchUsers, updateUser, deleteUser } = useUsers();
const modalRef = ref(null);

const openAddModal = () => {
    console.log("hello")
    modalRef.value?.open();
};

onMounted(async() => {
   await fetchUsers();
});

// const users = ref([])
// const add_user_modal = ref(null)
// const user_role = ref('')
// const username = ref('')
// const password = ref('')
// const message = ref('')
// const messageType = ref('')

// const openAddModal = () => {
//     add_user_modal.value?.showModal()
//     message.value = ''
//     messageType.value = ''
// }

// const saveUser = async() => {
//    const result = await window.api.addUser({
//     username: username.value,
//     password: password.value,
//     user_role: user_role.value
//    });
//    if(result.success){
//     message.value = 'User created';
//     messageType.value = 'success';
//     username.value = '';
//     password.value = '';
//    }else{
//     message.value = result.error;
//     messageType.value = 'error';
//    }
//    }

// const updateUser = async(user) => {
//     const result = await window.api.updateUser(user);
//     if(result.success){
//         // Update the user in the local users array
//         const index = users.value.findIndex(u => u.id === user.id);
//         if(index !== -1){
//             users.value[index] = user;
//         }
//     }else{
//         console.error("Failed to update user: ", result.error);
//     }
// }

// const deleteUser = async(user_id) => {
//     const result = await window.api.deleteUser(user_id);
//     if(result.success){
//         await fetchUsers();
//     }else{
//         console.error("Failed to delete user: ", result.error); 
//     }
// }

// const fetchUsers = async() => {
//       const result = await window.api.getAllUsers();
//     if(result.success){
//         users.value = result.users;
//     }else{
//         console.error("Failed to fetch users: ", result.error);
//     } 
// }

// onMounted(async() => {
//    await fetchUsers();
// });
</script>