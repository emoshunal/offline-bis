<template>
    <div class="pt-8">
        <Logout class="absolute top-4 right-4"/>
        <div class="card w-1/2 mx-auto bg-base-100 shadow-sm">
            <div class="card-body">
                <div class="card-header flex  mb-2">
                    <p class="text-lg font-bold">User Management</p>
                    <IconButton icon="plus" @click="openAddModal"/>

                </div>
              <UserTable :users="users" @edit="openUpdateModal" @delete="deleteUser"/>
            </div>
        </div>
    </div>
    <UserAddModal
    ref="modalRef"
    @saved="fetchUsers"
    />
    
    <UserUpdateModal
    ref="updateModalRef"
    @saved="fetchUsers"
    />
 
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUsers } from '../../../composables/useUsers'
import IconButton from '../../../components/Shared/IconButton.vue'
import UserTable from './components/UserTable.vue'
import UserAddModal from './components/UserAddModal.vue'
import UserUpdateModal from './components/UserUpdateModal.vue'
import Logout from '../../../components/Logout.vue'

const { users, fetchUsers, updateUser, deleteUser } = useUsers();
const modalRef = ref(null);
const updateModalRef = ref(null);

const openAddModal = () => {
    modalRef.value?.open();
};

const openUpdateModal = (user) => {
    updateModalRef.value?.open(user);
};

onMounted(async() => {
   await fetchUsers();
});


</script>