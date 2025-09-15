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
import { computed } from 'vue' 
import Sidebar from './components/Sidebar.vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'

const route = useRoute()

const hideSidebar = computed(() =>
  route.path.startsWith('/login')
  || route.path.startsWith('/login-token')
)
</script>
