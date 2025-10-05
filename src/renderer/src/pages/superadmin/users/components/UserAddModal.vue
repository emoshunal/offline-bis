<template>
       <dialog ref="modalRef" class="modal">
        <form method="dialog" @submit.prevent="handleSaveUser">
        
            <div class="modal-box w-96">
                <div class="flex flex-col gap-2">
                      <Alert v-if="message" :message="message" :type="messageType"/>
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
                            <option value="Kagawad">Kagawad</option>
                        </select>
                    </div>
                </div>
                <div class="modal-action">
                    <button class="btn btn-accent">Save</button>
                    <button class="btn" type="button"  @click="close()">Close</button>
                </div>
            </div>
        </form>
    </dialog>
</template>
<script setup>
import { ref } from 'vue';
import Alert from '../../../../components/Shared/Alert.vue';
import { useUsers } from '../../../../composables/useUsers';

const { saveUser } = useUsers();

const props = defineProps({roles: Array});
const emit = defineEmits(["saved"]);

const modalRef = ref(null);
const message = ref('');
const messageType = ref('');
const user_role = ref('');
const username = ref('');
const password = ref('');

const open = () => {
    resetForm();
    modalRef.value?.showModal();
}

const close = () => {
    modalRef.value?.close();
}

const resetForm = () => {
   // message.value = '';
  //  messageType.value = '';
    username.value = '';
    password.value = '';
    user_role.value = '';
}

const handleSaveUser = async() => {
    try{
        await saveUser({
        username: username.value,
        password: password.value,
        user_role: user_role.value
   });
    
        message.value = 'User created';
        messageType.value = 'success';
        username.value = '';
        password.value = '';
        emit('saved');
        resetForm();
     
    }catch(err){
        message.value = err.message || 'An error occurred';
        messageType.value = 'error';
    }
  
}
defineExpose({ open, close });

</script>