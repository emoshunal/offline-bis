import { ref } from "vue";
import { useRouter } from "vue-router";

const certs = ref([]);
export function useCertifications() {
   
    const fetchCerts = async (type = null) => {
        const response = await window.api.getAllCerts(type);
        if (response.success) {
            certs.value = response.certs;
        } else {
            console.error("Failed to fetch certifications: ", response.error);
        }
    };
      
    const saveCertification = async(certification) => {
        const response = await window.api.addCertification();
        if(response.success){
            //  fetchCerts
        }else{
            console.error("Failed to fetch users: ", response.error)
        }
    }

    return {
        certs,
        saveCertification,
        fetchCerts
    }
}