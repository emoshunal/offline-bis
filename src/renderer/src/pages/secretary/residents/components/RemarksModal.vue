<template>
    <dialog ref="remarksModalRef" class="modal">
        <form method="dialog" class="modal-box w-11/12 max-w-2xl">
            <h3 style="font-family: satoshi-bold;" class="text-lg mb-4">Add Remarks</h3>
            <div class="mb-4">
                <label style="font-family: satoshi;" class="label">
                    <span class="label-text">Remarks</span>
                </label>
                <input type="text" v-model="remarks" placeholder="Enter remarks" class="input input-bordered w-full">
                <span class="label-text-alt text-xs">Separate remarks by comma.</span>
            </div>
            <div class="modal-action">
                <button class="btn btn-accent" @click.prevent="saveRemarks">Save</button>
                <button class="btn" type="button" @click="close()">Close</button>
            </div>
        </form>

    </dialog>
</template>
<script setup>
import { ref } from 'vue';
import { useResidents } from '../../../../composables/useResidents';

const { updateResidentRemarks } = useResidents();
const remarksModalRef = ref(null);
const remarks = ref('');
const residentId = ref(null);

const emit = defineEmits(["remarks-saved"]);
const open = (resident) => {
    resetForm();
    if (resident) {
        residentId.value = resident.resident_id;
        remarks.value = resident.tags || '';
    } else {
        residentId.value = null;
        remarks.value = '';
    }
    remarksModalRef.value.showModal();
};

const close = () => {
    remarksModalRef.value.close();
};

const resetForm = () => {
    remarks.value = '';
    residentId.value = null;
};

const saveRemarks = async () => {
  try{
    if (!residentId.value) {
        console.error('Resident ID is required to save remarks.');
        return;
    }
    const response = await updateResidentRemarks({ resident_id: residentId.value, tags: remarks.value });
    if (response.success) {
        emit('remarks-saved');
        close();
    } else {
        console.error('Failed to save remarks:', response.message);
    }
  } catch (error) {
    console.error('Error saving remarks:', error);
  }
};

defineExpose({ open, close });
</script>