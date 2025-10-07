import { ref } from "vue";
import { useRouter } from "vue-router";

const users = ref([])
const currentUser = ref(null);
const loginError = ref("");
const router = useRouter();
export function useUsers() {


    const loadStoredUser = () => {
        const stored = localStorage.getItem("user");
        if (stored) currentUser.value = JSON.parse(stored);
      };
    const loginUser = async (username, password) => {
        const response = await window.api.loginUser({ username, password });
        if (response.success) {
            currentUser.value = response.user;
            loginError.value = "";
            localStorage.setItem("user", JSON.stringify(response.user));
            return true;
        } else {
            loginError.value = response.error || "Login failed";
            return false;
        }
    }
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
    const logout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };
    
    return {
        users,
        currentUser,
        loginError,
        loginUser,
        fetchUsers,
        saveUser,
        updateUser,
        deleteUser,
        logout,
        loadStoredUser
    }
}