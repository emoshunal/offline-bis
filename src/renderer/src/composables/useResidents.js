import { ref } from 'vue';

const residents = ref([]);

export function useResidents() {
    const loadStoredUser = () => {
        const stored = localStorage.getItem("user");
        if (stored) currentUser.value = JSON.parse(stored);
    };
    const fetchResidents = async () => {
        const response = await window.api.getAllResidents();
        console.log("Fetched Residents: ", response);
        if (response.success) {
            residents.value = response.residents;
            console.log("Residents updated: ", residents.value);
        } else {
            console.error("Failed to fetch residents: ", response.error);
        }
    };

    const updateResidentRemarks = async (residents) => {
        const response = await window.api.updateResidentRemarks(residents);
        return response;
    }

    return {
        residents,
        fetchResidents,
        loadStoredUser,
        updateResidentRemarks
    };
}