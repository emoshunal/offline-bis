<script setup lang="ts">
import QuickActionBar from './QuickActionBar.vue';

</script>


<template>
    <div class="flex flex-row gap-4 justify-between">
        <div class="card bg-base-100 shadow-md p-4 w-3/4">
            <h2 class="text-xl font-bold mb-4">Recent Activity</h2>
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>Added Resident</td>
                        <td>2025-09-12</td>
                    </tr>
                    <tr>
                        <td>Jane Smith</td>
                        <td>Issued Barangay Clearance</td>
                        <td>2025-09-12</td>
                    </tr>
                    <tr>
                        <td>Bob Johnson</td>
                        <td>Issued Certificate of Indigency</td>
                        <td>2025-09-11</td>
                    </tr>
                </tbody>
            </table>

        </div>
     
            <QuickActionBar />


    </div>

</template>