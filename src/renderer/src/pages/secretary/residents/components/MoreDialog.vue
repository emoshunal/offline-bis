<template>
  <dialog ref="moreDialogRef" class="modal">
    <div class="modal-box max-w-sm">
      <h3 style="font-family: satoshi-bold" class="text-xl text-gray-800">Document Issuance</h3>
      <p class="text-sm text-gray-500 mb-4">Select a document type to proceed:</p>
      <hr class="border-gray-200 mb-4">
      <div class="flex flex-col  gap-2 items-start">
        <button style="font-family: satoshi" class="btn btn-ghost btn-block justify-start text-left pl-4"
          @click="openPurposeModal('Barangay Clearance')">
          <svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9.5 11.5 11 13l4-3.5M12 20a16.405 16.405 0 0 1-5.092-5.804A16.694 16.694 0 0 1 5 6.666L12 4l7 2.667a16.695 16.695 0 0 1-1.908 7.529A16.406 16.406 0 0 1 12 20Z" />
          </svg>

          Barangay Clearance</button>
        <button class="btn btn-ghost btn-block justify-start text-left pl-4"
          @click="openPurposeModal('Certificate of Residency')">
          <svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
          </svg>
          Certificate of Residency</button>
        <button class="btn btn-ghost btn-block justify-start text-left pl-4"
          @click="openPurposeModal('Certificate of Indigency')">
          <svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 12a28.076 28.076 0 0 1-1.091 9M7.231 4.37a8.994 8.994 0 0 1 12.88 3.73M2.958 15S3 14.577 3 12a8.949 8.949 0 0 1 1.735-5.307m12.84 3.088A5.98 5.98 0 0 1 18 12a30 30 0 0 1-.464 6.232M6 12a6 6 0 0 1 9.352-4.974M4 21a5.964 5.964 0 0 1 1.01-3.328 5.15 5.15 0 0 0 .786-1.926m8.66 2.486a13.96 13.96 0 0 1-.962 2.683M7.5 19.336C9 17.092 9 14.845 9 12a3 3 0 1 1 6 0c0 .749 0 1.521-.031 2.311M12 12c0 3 0 6-2 9" />
          </svg>
          Certificate of Indigency</button>
        <button class="btn btn-ghost btn-block justify-start text-left pl-4"
          @click="openPurposeModal('Certificate of Good Moral')">
          <svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
          </svg>
          Certificate of Good Moral</button>
        <button class="btn btn-ghost btn-block justify-start text-left pl-4"
          @click="openPurposeModal('Certificate of Low Income')">
          <svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z" />
          </svg>
          Certificate of Low Income</button>
        <button class="btn btn-ghost btn-block justify-start text-left pl-4"
          @click="openPurposeModal('First Time Job Seeker')">
          <svg class="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h.01" />
          </svg>
          First Time Job Seeker</button>
      </div>

      <div class="modal-action">
        <form method="dialog">

          <button class="btn btn-error">Close</button>
        </form>
      </div>
    </div>
  </dialog>

  <dialog v-if="showPurposeModal" open class="modal">
    <div class="modal-box max-w-md">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">Purpose of Request</h3>
      <p class="text-sm text-gray-500 mb-4">
        For <strong>{{ selectedRow?.resident_name }}</strong> — {{ selectedDocument }}
      </p>
      <hr class="border-gray-200 my-4">
      <p v-if="selectedRow && selectedRow.tags !== null" class="text-xs mb-2" style="font-family: satoshi-light">
        <strong class="font-bold" style="font-family: satoshi-bold">Note:</strong> This person have the following
        remarks.
      </p>
      <div role="alert" class="alert alert-warning" v-if="selectedRow && selectedRow.tags !== null">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span class="font-bold">{{ selectedRow?.tags }}</span>
      </div>
      <form method="dialog" @submit.prevent="handleSaveCerts">
        <fieldset class="fieldset mt-4">

          <textarea v-model="purpose" class="textarea h-24 w-full textarea-md" placeholder="Purpose"></textarea>
          <div class="label">Do not leave blank</div>
        </fieldset>
        <div class="modal-action">
          <button class="btn btn-accent">Save and Print</button>
          <button class="btn" @click="showPurposeModal = false">Cancel</button>
        </div>
      </form>
    </div>
  </dialog>
</template>
<script setup>
import { ref } from 'vue';
import { useUsers } from '../../../../composables/useUsers';
import { useCertifications } from '../../../../composables/useCertifications';
import { useRouter } from 'vue-router';


const props = defineProps({ roles: Array })
const emit = defineEmits(["saved-certificate"])

const router = useRouter();

const moreDialogRef = ref(null);
const selectedRow = ref(null);
const selectedDocument = ref(null);
const showPurposeModal = ref(false);
const purpose = ref('')
const loading = ref(false)

const { saveCertification, printCertificate} = useCertifications();
const { currentUser } = useUsers()
const open = (row) => {
  selectedRow.value = row
  moreDialogRef.value.showModal();
}

const openPurposeModal = (documentName) => {
  selectedDocument.value = documentName
  showPurposeModal.value = true
  moreDialogRef.value.close();
  console.log(currentUser.value.user_id)
}

const close = () => {
  moreDialogRef.value.close();
}

const handleSaveCerts = async () => {
  try {
    loading.value = true;
    const response = await saveCertification({
      resident_id: selectedRow.value.resident_id,
      certification_type: selectedDocument.value,
      purpose: purpose.value,
      issued_by_user_id: currentUser.value.user_id,
    });
    console.log("reponses" ,currentUser.value.user_role)
    if (response.success) {
      const data = {
        ...response,
        resident_name: selectedRow.value.resident_name,
        certification_type: selectedDocument.value,
        purpose: purpose.value,
        issued_by: currentUser.value.user_role || "Barangay Official",
        date_issued: new Date().toISOString(),
      };

      // Navigate to preview route with data
      router.push({
        path: "/certificate-preview-print",
        query: { data: encodeURIComponent(JSON.stringify(data)) },
      });
   

    }
 
  } catch (error) {
    console.error("Failed certification: ", error)
  }finally{
    loading.value= false;
  }
}
defineExpose({ open, close });
</script>