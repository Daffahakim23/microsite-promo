<template>
    <div class="main-container">
        <div class="fixed-header">
            <i class="fas fa-arrow-left text-lg md:text-xl text-neutral-900" @click="goBack"></i>
            <p class="header-title">Riwayat Promo</p>
        </div>

        <div class="scrollable-content">
            <PromoHistory />
        </div>
        <div class="h-12"></div>
    </div>
</template>

<script>
// Import komponen-komponen yang dibutuhkan
import HeaderSection from '../components/HomePage/HeaderSection.vue';
import ProfileCard from '../components/HomePage/ProfileCard.vue';
import MenuIcons from '../components/HomePage/MenuIcons.vue';
import ActiveParkingCard from '../components/HomePage/ActiveParkingCard.vue';
import HorizontalListWithData from '../components/MicrositePromo/ListCard2.vue';
import PromoHistory from '../components/MicrositePromo/historyPromo.vue';

import HeaderNav from '../components/MicrositePromo/headerCategory.vue';
export default {
    name: 'SmartParkingSolution',
    components: {
        HeaderSection,
        ProfileCard,
        MenuIcons,
        ActiveParkingCard,
        HeaderNav,
        HorizontalListWithData,
        PromoHistory
    },
    data() {
        return {
        };
    },
    methods: {
        goBack() {
            this.$router.push('/merchant');
            console.log('Kembali ke halaman sebelumnya');
        },
    },
};
</script>

<style scoped>
.main-container {
    width: 100%;
    max-width: 500px;
    /* Optional: Adjust for mobile-first design */
    margin: 0 auto;
    min-height: 100vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
}

.fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    background: #fff;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 20;
}

.header-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.125rem;
    font-weight: bold;
    color: #171717;
}

.scrollable-content {
    flex-grow: 1;
    margin-top: 2rem;
    padding: 1.5rem;
    overflow-y: auto;
}
</style>
