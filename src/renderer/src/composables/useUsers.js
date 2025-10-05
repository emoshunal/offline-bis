import { ref } from "vue";

export function useUsers() {
    const users = ref([])

    const fetchUsers = async () => {
        const response = await window.api.getAllUsers();
        if (response.success) {
            users.value = response.users;
        } else {
            console.error("Failed to fetch users: ", response.error);
        }
    }

    const saveUser = async (user) => {
        const response = await window.api.addUser(user);
        if (response.success) {
            await fetchUsers(); // Refresh the user list
        } else {
            throw new Error(response.error || "Failed to add user");
        }
    }

    const updateUser = async (user) => {
        const response = await window.api.updateUser(user);
        if (response.success) {
            await fetchUsers(); // Refresh the user list
        } else {
            throw new Error(response.error || "Failed to update user");
        }
    }

    const deleteUser = async (user_id) => {
        const response = await window.api.deleteUser(user_id);
        if (response.success) {
            await fetchUsers(); // Refresh the user list
        } else {
            throw new Error(response.error || "Failed to delete user");
        }
    }
    
    return {
        users,
        fetchUsers,
        saveUser,
        updateUser,
        deleteUser
    }
}