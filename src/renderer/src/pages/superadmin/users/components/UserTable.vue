<template>

      <table class="table">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th></th>
                            <th>Username</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{ user.user_id }}</td>
                            <td>{{ user.username }}</td>
                            <td>{{ user.user_role }}</td>
                            <td class="flex gap-2 justify-start">
                                <IconButton icon="edit" @click="$emit('edit, user')" />
                                <IconButton icon="lock" @click="$emit('lock', user)" />
                            </td>
                        </tr>
                    </tbody>
                </table>
</template>

<script setup>
import IconButton from '../../../../components/Shared/IconButton.vue';
defineProps({
    users: { type: Array, required: true }
});
</script>