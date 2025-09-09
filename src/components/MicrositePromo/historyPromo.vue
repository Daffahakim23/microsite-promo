<template>
    <div class="max-w-lg mx-auto bg-white space-y-4">
        <div v-if="loading" class="text-center text-gray-500">
            <p>Memuat riwayat promo...</p>
        </div>

        <div v-else-if="promos.length === 0" class="text-center text-gray-500 mt-4">
            <p>Tidak ada riwayat promo yang ditemukan.</p>
        </div>

        <div v-else class="mt-8 space-y-2">
            <div v-for="promo in promos" :key="promo.promoId" class="cursor-pointer" @click="viewPromoDetail(promo)">
                <div class="flex items-center justify-between space-x-2">
                    <div class="flex items-center space-x-2">
                        <img :src="promo.imageURL" :alt="promo.title" class="w-24 h-16 object-cover">
                        <div class="space-y-2 flex flex-col justify-between h-full">
                            <p class="text-md font-semibold leading-5">{{ promo.title }}</p>
                            <div class="text-xs text-gray-500">
                                <!-- <p>{{ promo.promoId }}</p> -->
                                <p>{{ formatDate(promo.registeredDate) }}</p>
                            </div>
                        </div>
                    </div>

                    <i class="fas fa-chevron-right text-gray-400"></i>
                </div>
            </div>
        </div>
        <!-- <div class="h-8"></div> -->
    </div>
</template>

<script>
import { getFirestore, collectionGroup, getDocs, Timestamp } from 'firebase/firestore';
import { firebaseApp } from '@/firebase';

export default {
    name: 'PromoHistory',
    data() {
        return {
            promos: [],
            loading: true,
        };
    },
    async mounted() {
        await this.fetchPromoHistory();
    },
    methods: {
        async fetchPromoHistory() {
            this.loading = true;
            try {
                const db = getFirestore(firebaseApp);
                const promosRef = collectionGroup(db, 'promos');
                const querySnapshot = await getDocs(promosRef);

                this.promos = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        promoId: doc.id,
                        ...data,
                        category: doc.ref.parent.parent.id,
                    };
                });
            } catch (e) {
                console.error("Error saat mengambil riwayat promo: ", e);
            } finally {
                this.loading = false;
            }
        },
        viewPromoDetail(promo) {
            this.$router.push({
                name: 'DetailPromoScreen',
                params: {
                    categoryName: promo.category,
                    promoId: promo.promoId
                }
            });
        },
        formatDate(timestamp) {
            if (timestamp instanceof Timestamp) {
                const date = timestamp.toDate();
                return date.toLocaleString();
            }
            return 'N/A';
        },
    },
};
</script>

<style scoped>
/* Gaya CSS untuk tampilan riwayat promo */
</style>
