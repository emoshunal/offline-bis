import { ref } from "vue";
import { useRouter } from "vue-router";

export function useCertifications() {
   
    const saveCertification = async(certification) => {
        const response = await window.api.addCertification();
        if(response.success){
            //  fetchCerts
        }else{
            console.error("Failed to fetch users: ", response.error)
        }
    }

    return {
        saveCertification
    }
}