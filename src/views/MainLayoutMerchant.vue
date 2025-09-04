<template>
    <div class="bg-white flex flex-col">
        <main class="flex-grow">
            <router-view></router-view>
        </main>

        <BottomNavbar />
    </div>
</template>

<script>
import BottomNavbar from '../components/MicrositePromo/BottomNavBar.vue'; // Sesuaikan path

export default {
    name: 'MainLayout',
    components: {
        BottomNavbar,
    },
};
</script>