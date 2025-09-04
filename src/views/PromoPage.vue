<template>
    <div class="main-container">
        <div class="fixed-header">
            <i class="fas fa-arrow-left text-lg md:text-xl text-neutral-900" @click="goBack"></i>
            <p class="header-title">Tambah Promo</p>
        </div>

        <div class="scrollable-content">
            <PromoInputForm />
        </div>
        <div class="h-8"></div>
    </div>
</template>

<script>
import PromoInputForm from '../components/MicrositePromo/PromoInputForm.vue';

export default {
    components: {
        PromoInputForm
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
    margin-top: 3rem;
    padding: 1.5rem;
    overflow-y: auto;
}
</style>