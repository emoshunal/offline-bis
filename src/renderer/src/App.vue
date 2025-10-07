<template>
  <div v-if="!hideSidebar" class="flex h-screen">
    <Sidebar />
    <main class="flex-1 p-6">
      <NavBar />
      <router-view />
    </main>
  </div>

  <div v-else>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted,computed } from 'vue' 
import Sidebar from './components/Sidebar.vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { useUsers } from './composables/useUsers'

const route = useRoute()
const { loadStoredUser, currentUser } = useUsers()
onMounted(() => {
  loadStoredUser();
 
});

const hideSidebar = computed(() =>
  route.path.startsWith('/login')
  || route.path.startsWith('/login-token')
  || route.path.startsWith('/superadmin')
)
</script>
