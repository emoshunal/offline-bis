<template>
    <div class="dashboard-scroll space-y-6 mt-4 overflow-y-auto max-h-[85vh]">
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <CardStatsView />
        <!-- <Charts /> -->
        <h1 class="text-xl font-semibold">Population Demographics</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-6">
            <GenderDistribution />
            <PieAgeDistribution />
            <BarGraphSitio />
            <BarHouseHoldStatus />
            <ChartIncome />
            <ChartSocioEconomic />
        </div>
        <RecentActivityTable />
    </div>
</template>
<script setup>
import CardStatsView from './dashboard/CardStatsView.vue';
import Charts from './dashboard/Charts.vue';
import QuickActionBar from './dashboard/QuickActionBar.vue';
import RecentActivityTable from './dashboard/RecentActivityTable.vue';
import BarGraphSitio from './dashboard/BarGraphSitio.vue';
import GenderDistribution from './dashboard/GenderDistribution.vue';
import CasesByType from './dashboard/CasesByType.vue';
import PieAgeDistribution from './dashboard/PieAgeDistribution.vue';
import BarHouseHoldStatus from './dashboard/BarHouseHoldStatus.vue';
import ChartIncome from './dashboard/ChartIncome.vue';
import ChartSocioEconomic from './dashboard/ChartSocioEconomic.vue';
</script>
<style scoped>
/* Hide scrollbar by default, show on scroll */
.dashboard-scroll::-webkit-scrollbar {
    width: 0px;
    /* remove scrollbar for Chrome, Safari */
}

.dashboard-scroll {
    -ms-overflow-style: auto;
    /* IE and Edge */
    scrollbar-width: thin;
    /* Firefox */
}

/* Optional: fade scrollbar in when scrolling */
.dashboard-scroll:hover::-webkit-scrollbar {
    width: 8px;
}

.dashboard-scroll::-webkit-scrollbar-thumb {
    background-color: rgba(107, 114, 128, 0.5);
    /* semi-transparent gray */
    border-radius: 8px;
}
</style>
