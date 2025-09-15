<template>
    <div class="space-y-6 mt-4">
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <CardStatsView />
        <Charts />
        <RecentActivityTable />
    </div>
</template>
<script setup>
import CardStatsView from './dashboard/CardStatsView.vue';
import Charts from './dashboard/Charts.vue';
import QuickActionBar from './dashboard/QuickActionBar.vue';
import RecentActivityTable from './dashboard/RecentActivityTable.vue';
</script>
