<template>
    <div class="min-h-screen bg-gray-50 flex flex-col items-center p-4">
        <div class="w-full p-8 flex items-center justify-between mb-2">
            <div class="absolute top-2 left-0 right-0 p-8 flex items-center justify-between text-black z-10">
                <button @click="goBack" class="p-2 -m-2">
                    <i class="fas fa-arrow-left text-xl"></i>
                </button>
                <span class="text-md  font-semibold">{{ categoryName.replace(/-/g, ' ') }}</span>
                <i class="fas fa-ellipsis-v text-xl"></i>
            </div>
        </div>

        <div v-if="promo" class="bg-white p-6 rounded-lg shadow-md w-full">
            <div class="image-placeholder bg-gray-200 h-48 rounded-lg mb-4"></div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ promo.title }}</h2>
            <p class="text-gray-600 mb-4">{{ promo.subtitle }}</p>
            <p class="text-gray-600 mb-4">{{ promo.details }}</p>
            <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd" />
                </svg>
                <span>Berlaku s.d. {{ promo.validUntil }}</span>
            </div>
            <button
                class="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors">
                Tukarkan Sekarang
            </button>
        </div>
        <div v-else class="text-center text-gray-500 mt-8">
            Promo tidak ditemukan.
        </div>
    </div>
</template>

<script>
import { allPromoData } from '../data/promoData.js';

export default {
    name: 'DetailPromo',
    props: ['categoryName', 'promoId'],
    data() {
        return {
            promo: null,
        };
    },
    mounted() {
        this.fetchPromoDetails();
    },
    methods: {
        fetchPromoDetails() {
            const categoryData = allPromoData[this.categoryName.toLowerCase()];
            if (categoryData && categoryData[this.promoId]) {
                // Make sure promoId is treated as a number
                this.promo = categoryData[parseInt(this.promoId, 10)];
            } else {
                this.promo = null;
            }
        },
        goBack() {
            this.$router.push({ name: 'Category', params: { categoryName: this.categoryName } });
            console.log('Kembali ke halaman sebelumnya');
        },
    },
    watch: {
        '$route.params': 'fetchPromoDetails',
    },
};
</script>

<style scoped>
/* No specific styles needed beyond Tailwind */
</style>