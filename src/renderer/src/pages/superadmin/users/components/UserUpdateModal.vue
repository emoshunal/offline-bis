<template>
    <dialog ref="updateModalRef" class="modal">
        <form method="dialog" @submit.prevent="handleUpdateUser">

            <div class="modal-box w-96">
                <div class="flex flex-col gap-2">
                    <Alert v-if="message" :message="message" :type="messageType" />
                    <div class="form-control">
                        <label for="" class="label">
                            <span class="label-text">Username</span></label>
                        <input type="text" v-model="username" placeholder="Enter username" class="input input-bordered">
                    </div>
                  
                    <div class="form-control">
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
                    <button class="btn" type="button" @click="close()">Close</button>
                </div>
            </div>
        </form>
    </dialog>
</template>

<script setup>
import { ref } from 'vue';
import Alert from '../../../../components/Shared/Alert.vue';
import { useUsers } from '../../../../composables/useUsers';

const { updateUser } = useUsers();

const emit = defineEmits(["saved"]);

const updateModalRef = ref(null);
const message = ref('');
const messageType = ref('');
const userId = ref(null);
const user_role = ref('');
const username = ref('');


const open = (user) => {
    resetForm();
    if (user) {
        userId.value = user.user_id;
        username.value = user.username;
        user_role.value = user.user_role;
 

    } else {
        userId.value = null;
    }
    updateModalRef.value?.showModal();
}

const close = () => {
    updateModalRef.value?.close();
}
const resetForm = () => {
    message.value = '';
    messageType.value = '';
    username.value = '';
    user_role.value = '';
}

const handleUpdateUser = async () => {
    try {
        if (userId.value) {
            // Update existing user
            await updateUser({
                user_id: userId.value,
                username: username.value,
                user_role: user_role.value
            });
            message.value = 'User updated successfully';
            messageType.value = 'success';
            emit('saved');

            setTimeout(() => {
                close();
            }, 3000);
           
        }
    } catch (error) {
        message.value = error.message || 'An error occurred';
        messageType.value = 'error';
    }
}

defineExpose({ open, close });
</script>