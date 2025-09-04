<template>
    <div class="flex justify-between items-center px-4 py-2 text-sm text-gray-700">
        <span class="font-semibold">{{ currentTime }}</span>
        <div class="flex items-center space-x-2">
            <i class="fas fa-wifi"></i>
            <i class="fas fa-signal"></i>
            <span>{{ batteryPercentage }}%</span>
            <i class="fas fa-battery-half"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StatusBar',
    data() {
        return {
            currentTime: '12:30', // Data statis, bisa dibuat dinamis jika diperlukan
            batteryPercentage: 50 // Data statis
        };
    }
};
</script>

<style scoped>
/* Tidak ada gaya khusus yang diperlukan di sini, Tailwind sudah cukup */
</style>
