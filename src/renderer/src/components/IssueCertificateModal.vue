<template>
  <dialog v-if="visible" open class="modal">
    <div class="modal-box max-w-md">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">Issue {{ certType }}</h3>
      <p class="text-sm text-gray-500 mb-4">
        For <strong>{{ selectedResident?.resident_name }}</strong>
      </p>
      <hr class="border-gray-200 my-4" />

      <div v-if="selectedResident?.tags" class="alert alert-warning mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span><strong>Note:</strong> {{ selectedResident.tags }}</span>
      </div>

      <form @submit.prevent="handleSave">
        <fieldset class="fieldset mt-4">
          <textarea
            v-model="purpose"
            class="textarea h-24 w-full textarea-md"
            placeholder="Purpose of Request"
            required
          ></textarea>
          <label class="label text-xs text-gray-400">Do not leave blank</label>
        </fieldset>

        <div class="modal-action">
          <button class="btn btn-accent" type="submit" :disabled="loading">
            {{ loading ? 'Saving...' : 'Save and Print' }}
          </button>
          <button class="btn" type="button" @click="close">Cancel</button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup>
import { ref } from "vue";
import { useUsers } from "@/composables/useUsers";
import { useCertifications } from "@/composables/useCertifications";

const props = defineProps({
  visible: Boolean,
  certType: String, // e.g. "Barangay Clearance"
  selectedResident: Object
});

const emit = defineEmits(["close", "saved"]);

const purpose = ref("");
const loading = ref(false);

const { currentUser } = useUsers();
const { saveCertification } = useCertifications();

const handleSave = async () => {
  try {
    loading.value = true;

    await saveCertification({
      resident_id: props.selectedResident?.resident_id,
      certification_type: props.certType,
      purpose: purpose.value,
      issued_by_user_id: currentUser.value.user_id,
    });

    emit("saved"); // notify parent
    close();
  } catch (error) {
    console.error("Failed to save cert:", error);
  } finally {
    loading.value = false;
  }
};

const close = () => {
  purpose.value = "";
  emit("close");
};
</script>
