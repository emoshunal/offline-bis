<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-base-200">
    <span class="flex flex-row gap-2">
      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
        width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2" />
      </svg>
      <h1 class="mb-4" style="font-family: 'satoshi-bold';">Login to your account</h1>
    </span>

    <div class="bg-base-100 shadow-sm w-[700px] h-[450px] rounded-lg overflow-hidden flex">
      <!-- Left side (Image) -->
      <div class="w-1/2">
        <img src="../../assets/rice.jpg" alt="Image" class="w-full h-full object-cover" />
      </div>
      <!-- Right side (Content) -->
      <div class="w-1/2 flex flex-col justify-center p-6 gap-2">
        <div role="alert" v-if="error" class="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ error }}</span>
        </div>
        <form @submit.prevent="onLogin">
          <fieldset class="fieldset">
            <p class="text-base">Username</p>
            <input type="text" v-model="username" class="input focus:input-success" placeholder="username" />

          </fieldset>
          <fieldset class="fieldset mt-2 mb-2">
            <p class="text-base">Password</p>
            <input type="password" v-model="password" class="input focus:input-success" placeholder="password" />

          </fieldset>
          <p class="text-right"> <a class="link link-hover text-sm" @click="gotoLoginToken">Login as token</a></p>

          <button class="btn btn-success btn-block mt-2">Login</button>
        </form>
      </div>

    </div>
  </div>

</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUsers } from '../../composables/useUsers'


const username = ref('')
const password = ref('')
const { loginUser, currentUser, loginError } = useUsers()
const error = ref('')

const router = useRouter()

watch(loginError, (newError) => {
  if (newError) {
    error.value = newError
  }
});
async function onLogin() {
  // router.push('/superadmin');
  // return;
  error.value = ''
  if (!username.value || !password.value) {
    error.value = 'Field must not be empty'
  }
  const success = await loginUser(username.value, password.value)
  if (success) {
    const user = JSON.parse(JSON.stringify(currentUser.value))
    if (user.user_role === 'Admin') {
      router.push('/superadmin');
    } else if (user.user_role === 'Secretary') {
      router.push('/home');
    } else {
      error.value = 'Unauthorized role';
     
    }
  } else {
    error.value = loginError.value || 'Login failed. Please check your credentials.';
  }
}

const gotoLoginToken = () => {
  router.push('/login-token')
}
</script>
